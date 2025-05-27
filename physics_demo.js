const W = 1000, H = 700;
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// --- МНОГО параллакс-звёзд ---
const starLayers = [
  {layer:0.15, num:800},
  {layer:0.3, num:600},
  {layer:0.5, num:400},
  {layer:0.7, num:300},
  {layer:0.9, num:200}
];
const stars = [];
for(const {layer,num} of starLayers) {
  for(let i=0;i<num;++i) {
    stars.push({
      x: (Math.random()-0.5)*80000,
      y: (Math.random()-0.5)*80000,
      r: layer<0.7?1.1+Math.random()*1.2:2+Math.random()*2,
      color: ["#fff","#ffe","#bbf","#ffd700","#b0e0ff"][Math.floor(Math.random()*5)],
      layer
    });
  }
}

// --- Игрок и камера ---
let player = { x: 0, y: 0, vx: 0, vy: 0, angle: 0, accel: 0.38, friction: 0.98, maxSpeed: 8 };
let camera = { x: 0, y: 0 };

// --- Чёрные дыры ---
const blackholes = [];
function spawnBlackhole() {
  const r = 80 + Math.random()*40;
  const angle = Math.random()*Math.PI*2;
  const dist = 500 + Math.random()*600; // ближе к игроку
  blackholes.push({
    x: player.x + Math.cos(angle)*dist,
    y: player.y + Math.sin(angle)*dist,
    r: r,
    t: 0
  });
}
// Стартовые дыры
for(let i=0;i<3;++i) spawnBlackhole();

const keys = {};
window.addEventListener('keydown', e => keys[e.code]=true);
window.addEventListener('keyup', e => keys[e.code]=false);

let mouse = {x:W/2, y:H/2};
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// --- Gamepad/Touch joystick support ---
let gamepadState = {ax: 0, ay: 0};
let touchJoy = {active: false, sx: 0, sy: 0, x: 0, y: 0, ax: 0, ay: 0};

function pollGamepad() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (let pad of pads) {
    if (pad && pad.connected) {
      // Left stick
      let ax = pad.axes[0] || 0;
      let ay = pad.axes[1] || 0;
      // Deadzone
      if (Math.abs(ax) < 0.15) ax = 0;
      if (Math.abs(ay) < 0.15) ay = 0;
      gamepadState.ax = ax;
      gamepadState.ay = ay;
      return;
    }
  }
  gamepadState.ax = 0;
  gamepadState.ay = 0;
}

// --- Touch joystick for mobile ---
canvas.addEventListener('touchstart', e => {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    touchJoy.active = true;
    touchJoy.sx = t.clientX;
    touchJoy.sy = t.clientY;
    touchJoy.x = t.clientX;
    touchJoy.y = t.clientY;
    touchJoy.ax = 0;
    touchJoy.ay = 0;
  }
});
canvas.addEventListener('touchmove', e => {
  if (touchJoy.active && e.touches.length > 0) {
    const t = e.touches[0];
    touchJoy.x = t.clientX;
    touchJoy.y = t.clientY;
    let dx = touchJoy.x - touchJoy.sx;
    let dy = touchJoy.y - touchJoy.sy;
    const maxLen = 60;
    let len = Math.hypot(dx, dy);
    if (len > maxLen) {
      dx = dx / len * maxLen;
      dy = dy / len * maxLen;
      len = maxLen;
    }
    touchJoy.ax = dx / maxLen;
    touchJoy.ay = dy / maxLen;
  }
});
canvas.addEventListener('touchend', e => {
  touchJoy.active = false;
  touchJoy.ax = 0;
  touchJoy.ay = 0;
});

function update() {
  pollGamepad();

  // --- Игрок смотрит в сторону движения ---
  let speed = Math.hypot(player.vx, player.vy);
  if (speed > 0.2) {
    player.angle = Math.atan2(player.vy, player.vx);
  }
  // Если скорость почти нулевая — угол не меняется (оставляем прежний)

  // Управление (ускорение по WASD/стрелкам/геймпаду/тач-джойстику)
  let ax = 0, ay = 0;
  if (keys["KeyW"] || keys["ArrowUp"])    ay -= 1;
  if (keys["KeyS"] || keys["ArrowDown"])  ay += 1;
  if (keys["KeyA"] || keys["ArrowLeft"])  ax -= 1;
  if (keys["KeyD"] || keys["ArrowRight"]) ax += 1;
  if (Math.abs(gamepadState.ax) > 0.01 || Math.abs(gamepadState.ay) > 0.01) {
    ax += gamepadState.ax;
    ay += gamepadState.ay;
  }
  if (touchJoy.active && (Math.abs(touchJoy.ax) > 0.01 || Math.abs(touchJoy.ay) > 0.01)) {
    ax += touchJoy.ax;
    ay += touchJoy.ay;
  }
  if (ax || ay) {
    const len = Math.hypot(ax, ay);
    ax /= len; ay /= len;
    player.vx += ax * player.accel;
    player.vy += ay * player.accel;
  }

  // ...остальной update() без изменений...
  for(const bh of blackholes) {
    const dx = bh.x - player.x, dy = bh.y - player.y;
    const dist = Math.hypot(dx, dy);
    if (dist < bh.r*7) {
      const force = 0.13 * Math.min(1, bh.r*2/dist);
      player.vx += dx/dist * force;
      player.vy += dy/dist * force;
    }
    bh.t += 1;
  }

  speed = Math.hypot(player.vx, player.vy);
  if (speed > player.maxSpeed) {
    player.vx *= player.maxSpeed/speed;
    player.vy *= player.maxSpeed/speed;
  }
  player.vx *= player.friction;
  player.vy *= player.friction;
  player.x += player.vx;
  player.y += player.vy;

  camera.x += ((player.x - camera.x) * 0.12);
  camera.y += ((player.y - camera.y) * 0.12);

  for (let i = blackholes.length - 1; i >= 0; --i) {
    const bh = blackholes[i];
    const dist = Math.hypot(bh.x - player.x, bh.y - player.y);
    if (dist > 2000) {
      blackholes.splice(i, 1);
    }
  }
  if (blackholes.length < 4 && Math.random()<0.01) spawnBlackhole();
}

function draw() {
  // Фон
  ctx.fillStyle = "#181c2b";
  ctx.fillRect(0,0,W,H);
  // Звёзды с параллаксом
  for(const s of stars) {
    const sx = (s.x - camera.x*s.layer) + W/2;
    const sy = (s.y - camera.y*s.layer) + H/2;
    if (sx>=-4 && sx<W+4 && sy>=-4 && sy<H+4) {
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI*2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.95;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  // --- Индикаторы чёрных дыр ---
  for(const bh of blackholes) {
    const sx = bh.x - camera.x + W/2;
    const sy = bh.y - camera.y + H/2;
    if (sx < 0 || sx > W || sy < 0 || sy > H) {
      // Нарисовать стрелку-указатель на границе экрана
      const dx = sx - W/2, dy = sy - H/2;
      const angle = Math.atan2(dy, dx);
      // Граница экрана с отступом
      const margin = 40;
      let tx = W/2 + Math.cos(angle) * (W/2 - margin);
      let ty = H/2 + Math.sin(angle) * (H/2 - margin);
      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(12, 18);
      ctx.lineTo(-12, 18);
      ctx.closePath();
      ctx.fillStyle = "#50b0ff";
      ctx.globalAlpha = 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }
  // Чёрные дыры (рисуем только если они на экране)
  for(const bh of blackholes) {
    const sx = bh.x - camera.x + W/2;
    const sy = bh.y - camera.y + H/2;
    if (sx > -bh.r && sx < W+bh.r && sy > -bh.r && sy < H+bh.r) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(sx, sy, bh.r+18+Math.sin(bh.t*0.07)*6, 0, Math.PI*2);
      ctx.strokeStyle = "#50b0ff";
      ctx.globalAlpha = 0.22 + 0.13*Math.sin(bh.t*0.07);
      ctx.lineWidth = 16;
      ctx.stroke();
      ctx.globalAlpha = 1;
      let grad = ctx.createRadialGradient(sx, sy, bh.r*0.2, sx, sy, bh.r*0.95);
      grad.addColorStop(0, "#222a");
      grad.addColorStop(1, "#181c2b");
      ctx.beginPath();
      ctx.arc(sx, sy, bh.r*0.95, 0, Math.PI*2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(sx, sy, bh.r*0.6, 0, Math.PI*2);
      ctx.fillStyle = "#000";
      ctx.globalAlpha = 0.93;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }
  // Игрок
  ctx.save();
  ctx.translate(W/2, H/2);
  ctx.rotate(player.angle + Math.PI/2);
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(20, 20);
  ctx.lineTo(0, 10);
  ctx.lineTo(-20, 20);
  ctx.closePath();
  ctx.fillStyle = "#ffd700";
  ctx.shadowColor = "#fffbe6";
  ctx.shadowBlur = 18;
  ctx.globalAlpha = 0.96;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#23264a";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // HUD
  ctx.save();
  ctx.font = "bold 22px Arial";
  ctx.fillStyle = "#ffd700";
  ctx.fillText("Управоение WASD/Стрелки/Джойстик/Тачскрин | Чёрные дыры притягивают", 24, W < 700 ? H-12 : H-24);
  ctx.restore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();