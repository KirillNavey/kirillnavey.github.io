const inputs = document.querySelectorAll('input');
const tips = document.querySelectorAll('.tip');

// Список упражнений для прогресса
const exercisesList = [
  "Жим лёжа", "Тяга в наклоне", "Жим гантелей сидя", "Бицепс", "Французский жим",
  "Приседания со штангой", "Румынская тяга", "Выпады с гантелями", "Подъёмы на носки", "Планка",
  "Бёрпи", "Скейтеры", "Прыжки на скакалке", "Альпинист", "Велосипед (пресс)",
  "Становая тяга", "Жим штанги стоя", "Тяга штанги к поясу", "Приседания с гантелями", "Планка с подтягиванием коленей"
];

// Альтернативные упражнения для "шафла"
const alternativeExercises = {
  day1: [
    { name: "Подтягивания", sets: "3×8", track: "Повт: <input type='number' data-id='0r'>", exercise: "Подтягивания" },
    { name: "Разведения гантелей лёжа", sets: "3×12", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>", exercise: "Разведения гантелей лёжа" },
    { name: "Тяга штанги к подбородку", sets: "3×10", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>", exercise: "Тяга штанги к подбородку" },
    { name: "Молотковый подъём на бицепс", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>", exercise: "Молотковый подъём на бицепс" },
    { name: "Отжимания на брусьях (трицепс)", sets: "3×10", track: "Повт: <input type='number' data-id='4r'>", exercise: "Отжимания на брусьях (трицепс)" }
  ],
  day3: [
    { name: "Жим ногами в тренажёре", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>", exercise: "Жим ногами в тренажёре" },
    { name: "Становая тяга на прямых ногах", sets: "4×10", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>", exercise: "Становая тяга на прямых ногах" },
    { name: "Боковые выпады", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>", exercise: "Боковые выпады" },
    { name: "Степ-апы на скамью", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>", exercise: "Степ-апы на скамью" },
    { name: "Ягодичный мостик", sets: "3×15", track: "Вес: <input type='number' data-id='9w'> кг Повт: <input type='number' data-id='9r'>", exercise: "Ягодичный мостик" }
  ],
  day5: [
    { name: "Прыжки с разведением рук и ног", sets: "3×30", track: "Повт: <input type='number' data-id='10r'>", exercise: "Прыжки с разведением рук и ног" },
    { name: "Спринты на месте", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='11t'> сек", exercise: "Спринты на месте" },
    { name: "Прыжки на коробку", sets: "3×12", track: "Повт: <input type='number' data-id='12r'>", exercise: "Прыжки на коробку" },
    { name: "Подъёмы коленей к груди", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек", exercise: "Подъёмы коленей к груди" },
    { name: "Русские скручивания", sets: "3×20", track: "Повт: <input type='number' data-id='14r'>", exercise: "Русские скручивания" }
  ],
  day7: [
    { name: "Тяга в тренажёре (сидя)", sets: "3×10", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>", exercise: "Тяга в тренажёре (сидя)" },
    { name: "Отжимания с узкой постановкой рук", sets: "3×10", track: "Повт: <input type='number' data-id='16r'>", exercise: "Отжимания с узкой постановкой рук" },
    { name: "Гоблет-приседания", sets: "3×12", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>", exercise: "Гоблет-приседания" },
    { name: "Русские скручивания с весом", sets: "3×15", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>", exercise: "Русские скручивания с весом" },
    { name: "Бёрпи с отжиманием", sets: "3×10", track: "Повт: <input type='number' data-id='19r'>", exercise: "Бёрпи с отжиманием" }
  ]
};

// Функции для работы с cookies
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

// Функция для проверки выполнения всех упражнений
function areAllExercisesCompleted() {
  const days = ['day1', 'day3', 'day5', 'day7'];
  for (const day of days) {
    const exercises = document.querySelectorAll(`#exercises-${day} li`);
    for (const exercise of exercises) {
      if (!exercise.classList.contains('completed')) {
        return false;
      }
    }
  }
  return true;
}

// Функция для обновления отображения текущей недели с анимацией
function updateWeekDisplay() {
  const currentWeek = localStorage.getItem('currentWeek') || '1';
  const weekDisplay = document.getElementById('current-week');
  const weekHeader = document.getElementById('week-header');
  if (weekDisplay && weekHeader) {
    weekDisplay.textContent = currentWeek;
    console.log('Обновление недели:', currentWeek); // Отладка
    weekHeader.classList.remove('week-animate'); // Сбрасываем анимацию
    void weekHeader.offsetWidth; // Принудительно перезапускаем анимацию
    weekHeader.classList.add('week-animate'); // Запускаем анимацию
    console.log('Анимация запущена для week-header'); // Отладка
  } else {
    console.error('Элемент #week-header или #current-week не найден'); // Отладка
  }
}

// Функции для работы с localStorage для exerciseProgress
function saveExerciseProgress(exercise, weight, reps, time) {
  let progress = localStorage.getItem('exerciseProgress');
  if (!progress) {
    progress = {};
  } else {
    try {
      progress = JSON.parse(progress);
    } catch (e) {
      console.error('Ошибка при разборе exerciseProgress из localStorage:', e);
      progress = {};
    }
  }

  if (!progress[exercise]) {
    progress[exercise] = [];
  }
  const newEntry = {
    date: new Date().toISOString(),
    weight: weight || 0,
    reps: reps || 0,
    time: time || 0
  };
  progress[exercise].push(newEntry);

  console.log(`Сохранение прогресса для ${exercise}:`, newEntry);
  localStorage.setItem('exerciseProgress', JSON.stringify(progress));
  console.log(`localStorage exerciseProgress обновлён:`, localStorage.getItem('exerciseProgress'));
}

function loadProgress() {
  // Загрузка текущей недели
  if (!localStorage.getItem('currentWeek')) {
    localStorage.setItem('currentWeek', '1');
  }
  updateWeekDisplay();

  // Загрузка данных из localStorage
  inputs.forEach(input => {
    const saved = localStorage.getItem(input.dataset.id);
    if (saved !== null) input.value = saved;
    checkInputs(input);
  });

  // Загрузка данных из cookies
  const savedInputs = getCookie('userInputs');
  if (savedInputs) {
    const parsed = JSON.parse(savedInputs);
    Object.keys(parsed).forEach(dataId => {
      const input = document.querySelector(`input[data-id="${dataId}"]`);
      if (input) {
        input.value = parsed[dataId];
        checkInputs(input);
      }
    });
  }

  // Загрузка выполненных упражнений
  const completedExercises = getCookie('completedExercises');
  if (completedExercises) {
    const parsed = JSON.parse(completedExercises);
    parsed.forEach(exercise => {
      const li = document.querySelector(`li[data-exercise="${exercise}"]`);
      if (li) {
        li.classList.add('completed');
        const btn = li.querySelector('.complete-btn');
        btn.classList.add('completed');
        btn.textContent = 'Выполнено';
        btn.disabled = false;
      }
    });
  }

  const lastDay = getCookie('lastDay');
  if (lastDay) {
    showDay(lastDay);
  }

  // Загрузка темы
  const theme = getCookie('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark');
    document.querySelector('.theme-toggle').textContent = '☀️';
  }

  // Загрузка предложенных весов
  const suggestedWeights = getCookie('suggestedWeights');
  if (suggestedWeights) {
    const weights = JSON.parse(suggestedWeights);
    Object.keys(weights).forEach(dayId => {
      weights[dayId].forEach((suggestion, index) => {
        const li = document.querySelector(`#exercises-${dayId} li:nth-child(${index + 1})`);
        if (li) {
          const suggestedSpan = li.querySelector('.suggested-weight');
          suggestedSpan.textContent = suggestion;
          suggestedSpan.classList.add('show');
        }
      });
    });
  }

  updateAchievements();
}

function saveProgress() {
  inputs.forEach(input => {
    localStorage.setItem(input.dataset.id, input.value);
  });

  const userInputs = {};
  inputs.forEach(input => {
    userInputs[input.dataset.id] = input.value;
  });
  setCookie('userInputs', JSON.stringify(userInputs), 30);

  showTips();
}

function saveSuggestedWeights() {
  const suggestedWeights = {};
  ['day1', 'day3', 'day5', 'day7'].forEach(dayId => {
    suggestedWeights[dayId] = [];
    document.querySelectorAll(`#exercises-${dayId} .suggested-weight`).forEach(span => {
      suggestedWeights[dayId].push(span.textContent);
    });
  });
  setCookie('suggestedWeights', JSON.stringify(suggestedWeights), 30);
}

function saveCompletedExercises() {
  const completedExercises = [];
  document.querySelectorAll('li.completed').forEach(li => {
    completedExercises.push(li.dataset.exercise);
  });
  setCookie('completedExercises', JSON.stringify(completedExercises), 30);
}

function resetProgress() {
  if (confirm("Вы уверены, что хотите сбросить прогресс? Это удалит все достижения.")) {
    inputs.forEach(input => {
      input.value = "";
      localStorage.removeItem(input.dataset.id);
      checkInputs(input);
    });
    tips.forEach(tip => tip.textContent = "");
    document.querySelectorAll('.suggested-weight').forEach(span => {
      span.textContent = '';
      span.classList.remove('show');
    });
    document.querySelectorAll('li.completed').forEach(li => {
      li.classList.remove('completed');
      const btn = li.querySelector('.complete-btn');
      btn.classList.remove('completed');
      btn.textContent = 'Выполнено';
      btn.disabled = true;
    });
    setCookie('suggestedWeights', '', -1);
    setCookie('userInputs', '', -1);
    setCookie('completedExercises', '', -1);
    localStorage.removeItem('exerciseProgress');
    localStorage.setItem('currentWeek', '1');
    updateWeekDisplay();
    updateAchievements();
  }
}

function startNextWeek() {
  if (!areAllExercisesCompleted()) {
    alert("Нельзя начать следующую неделю, пока не выполнены все упражнения в каждом дне!");
    return;
  }

  if (confirm("Начать следующую неделю? Текущие значения будут очищены, но достижения сохранятся.")) {
    inputs.forEach(input => {
      input.value = "";
      localStorage.setItem(input.dataset.id, "");
      checkInputs(input);
    });
    document.querySelectorAll('li.completed').forEach(li => {
      li.classList.remove('completed');
      const btn = li.querySelector('.complete-btn');
      btn.classList.remove('completed');
      btn.textContent = 'Выполнено';
      btn.disabled = true;
    });
    setCookie('userInputs', JSON.stringify({}), 30);
    setCookie('completedExercises', JSON.stringify([]), 30);

    let currentWeek = parseInt(localStorage.getItem('currentWeek')) || 1;
    currentWeek += 1;
    localStorage.setItem('currentWeek', currentWeek.toString());
    updateWeekDisplay();

    updateAchievements();
  }
}

function checkInputs(input) {
  const li = input.closest('li');
  if (!li) return;
  const weightInput = li.querySelector('input[data-id$="w"]');
  const repsInput = li.querySelector('input[data-id$="r"]');
  const timeInput = li.querySelector('input[data-id$="t"]');
  const btn = li.querySelector('.complete-btn');

  if (btn.classList.contains('completed')) return;

  const hasWeight = weightInput ? parseFloat(weightInput.value) > 0 : true;
  const hasReps = repsInput ? parseInt(repsInput.value) > 0 : true;
  const hasTime = timeInput ? parseInt(timeInput.value) > 0 : true;

  if ((hasWeight && hasReps) || hasTime) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function completeExercise(btn) {
  const li = btn.closest('li');
  const exercise = li.dataset.exercise;
  const weightInput = li.querySelector('input[data-id$="w"]');
  const repsInput = li.querySelector('input[data-id$="r"]');
  const timeInput = li.querySelector('input[data-id$="t"]');
  
  const weight = weightInput ? parseFloat(weightInput.value) || 0 : 0;
  const reps = repsInput ? parseInt(repsInput.value) || 0 : 0;
  const time = timeInput ? parseInt(timeInput.value) || 0 : 0;

  if ((weightInput && (!weight || !reps)) || (timeInput && !time)) {
    alert("Пожалуйста, укажите вес и повторения или длительность.");
    return;
  }

  li.classList.add('completed');
  btn.classList.add('completed');
  btn.textContent = 'Выполнено';

  saveExerciseProgress(exercise, weight, reps, time);
  saveCompletedExercises();
  updateAchievements();
}

function showTips() {
  const upperWeights = Array.from(inputs)
    .filter(i => ['0w', '1w', '2w', '3w', '4w'].includes(i.dataset.id))
    .map(i => +i.value || 0);
  const upperAvg = upperWeights.reduce((a, b) => a + b, 0) / (upperWeights.length || 1);
  if (upperAvg > 0) {
    document.querySelector('#day1 .tip').textContent =
      "Совет: попробуй увеличить вес на 2.5-5 кг, если выполнение стало лёгким.";
  }

  const lowerWeights = Array.from(inputs)
    .filter(i => ['5w', '6w', '7w', '8w'].includes(i.dataset.id))
    .map(i => +i.value || 0);
  const lowerAvg = lowerWeights.reduce((a, b) => a + b, 0) / (lowerWeights.length || 1);
  if (lowerAvg > 0) {
    document.querySelector('#day3 .tip').textContent =
      "Совет: если приседания даются легко, добавь 5 кг или увеличь повторения.";
  }

  const enduranceTimes = Array.from(inputs)
    .filter(i => ['12t', '13t'].includes(i.dataset.id))
    .map(i => +i.value || 0);
  const enduranceAvg = enduranceTimes.reduce((a, b) => a + b, 0) / (enduranceTimes.length || 1);
  if (enduranceAvg > 0) {
    document.querySelector('#day5 .tip').textContent =
      "Совет: увеличь время на 10-15 секунд, если чувствуешь, что можешь больше.";
  }

  const fullBodyWeights = Array.from(inputs)
    .filter(i => ['15w', '16w', '17w', '18w'].includes(i.dataset.id))
    .map(i => +i.value || 0);
  const fullBodyAvg = fullBodyWeights.reduce((a, b) => a + b, 0) / (fullBodyWeights.length || 1);
  if (fullBodyAvg > 0) {
    document.querySelector('#day7 .tip').textContent =
      "Совет: если чувствуешь силы, добавь 2.5 кг к становой тяге или жиму.";
  }
}

function showDay(id) {
  document.querySelectorAll('.day').forEach(d => {
    d.classList.remove('active');
    d.style.opacity = '0';
  });
  const targetDay = document.getElementById(id);
  targetDay.classList.add('active');
  targetDay.style.opacity = '1';
  setCookie('lastDay', id, 30);
}

function suggestWeights() {
  const height = +document.getElementById('height').value / 100;
  const weight = +document.getElementById('weight').value;
  if (!height || !weight) {
    alert("Пожалуйста, введите рост и вес.");
    return;
  }

  const bmi = weight / (height * height);
  let weightSuggestion, repSuggestion, timeSuggestion;

  if (bmi < 18.5) {
    weightSuggestion = 10;
    repSuggestion = 12;
  } else if (bmi <= 24.9) {
    weightSuggestion = 20;
    repSuggestion = 10;
  } else {
    weightSuggestion = 30;
    repSuggestion = 8;
  }
  document.querySelectorAll('#exercises-day1 li').forEach((li, index) => {
    const suggestedSpan = li.querySelector('.suggested-weight');
    suggestedSpan.textContent = index < 4 ? `(Предложено: ${weightSuggestion} кг, ${repSuggestion} повт.)` : `(Предложено: ${repSuggestion} повт.)`;
    suggestedSpan.classList.add('show');
  });

  if (bmi < 18.5) {
    weightSuggestion = 15;
    repSuggestion = 12;
    timeSuggestion = 30;
  } else if (bmi <= 24.9) {
    weightSuggestion = 25;
    repSuggestion = 10;
    timeSuggestion = 40;
  } else {
    weightSuggestion = 35;
    repSuggestion = 8;
    timeSuggestion = 50;
  }
  document.querySelectorAll('#exercises-day3 li').forEach((li, index) => {
    const suggestedSpan = li.querySelector('.suggested-weight');
    if (index < 4) {
      suggestedSpan.textContent = `(Предложено: ${weightSuggestion} кг, ${repSuggestion} повт.)`;
    } else {
      suggestedSpan.textContent = `(Предложено: ${timeSuggestion} сек)`;
    }
    suggestedSpan.classList.add('show');
  });

  if (bmi < 18.5) {
    repSuggestion = 15;
    timeSuggestion = 60;
  } else if (bmi <= 24.9) {
    repSuggestion = 12;
    timeSuggestion = 40;
  } else {
    repSuggestion = 10;
    timeSuggestion = 50;
  }
  document.querySelectorAll('#exercises-day5 li').forEach((li, index) => {
    const suggestedSpan = li.querySelector('.suggested-weight');
    if (index === 2 || index === 3) {
      suggestedSpan.textContent = `(Предложено: ${timeSuggestion} сек)`;
    } else {
      suggestedSpan.textContent = `(Предложено: ${repSuggestion} повт.)`;
    }
    suggestedSpan.classList.add('show');
  });

  if (bmi < 18.5) {
    weightSuggestion = 12;
    repSuggestion = 12;
    timeSuggestion = 30;
  } else if (bmi <= 24.9) {
    weightSuggestion = 20;
    repSuggestion = 10;
    timeSuggestion = 40;
  } else {
    weightSuggestion = 30;
    repSuggestion = 8;
    timeSuggestion = 50;
  }
  document.querySelectorAll('#exercises-day7 li').forEach((li, index) => {
    const suggestedSpan = li.querySelector('.suggested-weight');
    if (index < 4) {
      suggestedSpan.textContent = `(Предложено: ${weightSuggestion} кг, ${repSuggestion} повт.)`;
    } else {
      suggestedSpan.textContent = `(Предложено: ${timeSuggestion} сек)`;
    }
    suggestedSpan.classList.add('show');
  });

  saveSuggestedWeights();
  showTips();
}

function shuffleExercises(dayId) {
  const exercisesList = document.getElementById(`exercises-${dayId}`);
  exercisesList.style.opacity = '0';
  setTimeout(() => {
    const alternatives = alternativeExercises[dayId];
    exercisesList.innerHTML = alternatives.map(ex => `
      <li data-exercise="${ex.exercise}">${ex.name} — ${ex.sets} <span class="suggested-weight"></span><div class="track">${ex.track}</div><button class="complete-btn" onclick="completeExercise(this)" disabled>Выполнено</button></li>
    `).join('');
    exercisesList.style.opacity = '1';
    const newInputs = exercisesList.querySelectorAll('input');
    newInputs.forEach(input => {
      input.addEventListener('input', saveProgress);
      input.addEventListener('input', () => checkInputs(input));
    });
    saveSuggestedWeights();
    saveCompletedExercises();
  }, 300);
}

function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    themeToggle.textContent = '☀️';
    setCookie('theme', 'dark', 30);
  } else {
    themeToggle.textContent = '🌙';
    setCookie('theme', 'light', 30);
  }
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.querySelectorAll('.menu-item').forEach(item => {
    item.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);
  targetPage.classList.add('active');
  document.querySelector(`.menu-item[onclick="showPage('${pageId}')"]`).classList.add('active');
  toggleSidebar();
  if (pageId === 'progress') {
    updateAchievements();
  }
}

function updateAchievements() {
  let progress = localStorage.getItem('exerciseProgress');
  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = '';

  console.log('Полученные данные из localStorage exerciseProgress:', progress);

  if (!progress) {
    achievementsList.innerHTML = '<li>Нет данных о достижениях. Выполните упражнения, чтобы увидеть прогресс.</li>';
    return;
  }

  try {
    progress = JSON.parse(progress);
    console.log('Распарсенные данные:', progress);
  } catch (e) {
    console.error('Ошибка при разборе exerciseProgress:', e);
    achievementsList.innerHTML = '<li>Ошибка загрузки данных. Попробуйте сбросить прогресс и начать заново.</li>';
    return;
  }

  let hasAchievements = false;
  exercisesList.forEach(exercise => {
    const data = progress[exercise] || [];
    if (data.length === 0) return;

    console.log(`Данные для ${exercise}:`, data);

    const maxWeight = Math.max(...data.map(entry => entry.weight || 0));
    const maxReps = Math.max(...data.map(entry => entry.reps || 0));
    const maxTime = Math.max(...data.map(entry => entry.time || 0));

    let achievementText = `${exercise}: `;
    const parts = [];
    if (maxWeight > 0) parts.push(`Макс. вес: ${maxWeight} кг`);
    if (maxReps > 0) parts.push(`Макс. повторения: ${maxReps}`);
    if (maxTime > 0) parts.push(`Макс. время: ${maxTime} сек`);
    if (parts.length === 0) return;
    achievementText += parts.join(', ');

    const li = document.createElement('li');
    li.textContent = achievementText;
    achievementsList.appendChild(li);
    hasAchievements = true;
  });

  if (!hasAchievements) {
    achievementsList.innerHTML = '<li>Нет данных о достижениях. Выполните упражнения, чтобы увидеть прогресс.</li>';
  }
}

inputs.forEach(input => {
  input.addEventListener('input', saveProgress);
  input.addEventListener('input', () => checkInputs(input));
});
window.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  showTips();
  updateAchievements();
});