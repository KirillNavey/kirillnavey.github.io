const inputs = document.querySelectorAll('input');
const tips = document.querySelectorAll('.tip');

// Альтернативные упражнения для "шафла"
const alternativeExercises = {
  day1: [
    { name: "Подтягивания", sets: "3×8", track: "Повт: <input type='number' data-id='0r'>" },
    { name: "Разведения гантелей лёжа", sets: "3×12", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
    { name: "Тяга штанги к подбородку", sets: "3×10", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
    { name: "Молотковый подъём на бицепс", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
    { name: "Отжимания на брусьях (трицепс)", sets: "3×10", track: "Повт: <input type='number' data-id='4r'>" }
  ],
  day3: [
    { name: "Жим ногами в тренажёре", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
    { name: "Становая тяга на прямых ногах", sets: "4×10", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
    { name: "Боковые выпады", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
    { name: "Степ-апы на скамью", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
    { name: "Ягодичный мостик", sets: "3×15", track: "Вес: <input type='number' data-id='9w'> кг Повт: <input type='number' data-id='9r'>" }
  ],
  day5: [
    { name: "Прыжки с разведением рук и ног", sets: "3×30", track: "Повт: <input type='number' data-id='10r'>" },
    { name: "Спринты на месте", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='11t'> сек" },
    { name: "Прыжки на коробку", sets: "3×12", track: "Повт: <input type='number' data-id='12r'>" },
    { name: "Подъёмы коленей к груди", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
    { name: "Русские скручивания", sets: "3×20", track: "Повт: <input type='number' data-id='14r'>" }
  ],
  day7: [
    { name: "Тяга в тренажёре (сидя)", sets: "3×10", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
    { name: "Отжимания с узкой постановкой рук", sets: "3×12", track: "Повт: <input type='number' data-id='16r'>" },
    { name: "Гоблет-приседания", sets: "3×12", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>" },
    { name: "Русские скручивания с весом", sets: "3×15", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
    { name: "Бёрпи с отжиманием", sets: "3×10", track: "Повт: <input type='number' data-id='19r'>" }
  ]
};

// Функции для работы с cookies
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function loadProgress() {
  inputs.forEach(input => {
    const saved = localStorage.getItem(input.dataset.id);
    if (saved !== null) input.value = saved;
  });
  const lastDay = getCookie('lastDay');
  if (lastDay) {
    showDay(lastDay);
  }
}

function saveProgress() {
  inputs.forEach(input => {
    localStorage.setItem(input.dataset.id, input.value);
  });
  showTips();
}

function resetProgress() {
  if (confirm("Вы уверены, что хотите сбросить прогресс?")) {
    inputs.forEach(input => {
      input.value = "";
      localStorage.removeItem(input.dataset.id);
    });
    tips.forEach(tip => tip.textContent = "");
  }
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

// Функция для плавного увеличения значения веса
function animateValue(input, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    input.value = value;
    input.classList.add('update');
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

function suggestWeights() {
  const height = +document.getElementById('height').value / 100;
  const weight = +document.getElementById('weight').value;
  if (!height || !weight) {
    alert("Пожалуйста, введите рост и вес.");
    return;
  }

  const bmi = weight / (height * height);
  let weightSuggestion, repSuggestion;

  // Обнуляем все значения весов и повторений
  document.querySelectorAll('input[data-id$="w"], input[data-id$="r"], input[data-id$="t"]').forEach(input => {
    animateValue(input, +input.value || 0, 0, 300); // Плавное обнуление за 300 мс
    localStorage.setItem(input.dataset.id, 0);
  });

  // Задержка перед добавлением новых значений, чтобы обнуление завершилось
  setTimeout(() => {
    // День 1 (Верх)
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
    document.querySelectorAll('#exercises-day1 input[data-id$="w"]').forEach(input => {
      const newValue = weightSuggestion;
      animateValue(input, 0, newValue, 500); // Анимация на 500 мс
      localStorage.setItem(input.dataset.id, newValue);
    });
    document.querySelectorAll('#exercises-day1 input[data-id$="r"]').forEach(input => {
      const newValue = repSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });

    // День 3 (Низ)
    if (bmi < 18.5) {
      weightSuggestion = 15;
      repSuggestion = 12;
    } else if (bmi <= 24.9) {
      weightSuggestion = 25;
      repSuggestion = 10;
    } else {
      weightSuggestion = 35;
      repSuggestion = 8;
    }
    document.querySelectorAll('#exercises-day3 input[data-id$="w"]').forEach(input => {
      const newValue = weightSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });
    document.querySelectorAll('#exercises-day3 input[data-id$="r"]').forEach(input => {
      const newValue = repSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });

    // День 5 (Выносливость)
    if (bmi < 18.5) {
      repSuggestion = 15;
      document.querySelectorAll('#exercises-day5 input[data-id$="t"]').forEach(input => {
        const newValue = 30;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    } else if (bmi <= 24.9) {
      repSuggestion = 12;
      document.querySelectorAll('#exercises-day5 input[data-id$="t"]').forEach(input => {
        const newValue = 40;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    } else {
      repSuggestion = 10;
      document.querySelectorAll('#exercises-day5 input[data-id$="t"]').forEach(input => {
        const newValue = 50;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    }
    document.querySelectorAll('#exercises-day5 input[data-id$="r"]').forEach(input => {
      const newValue = repSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });

    // День 7 (Обобщённый)
    if (bmi < 18.5) {
      weightSuggestion = 12;
      repSuggestion = 12;
      document.querySelectorAll('#exercises-day7 input[data-id$="t"]').forEach(input => {
        const newValue = 30;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    } else if (bmi <= 24.9) {
      weightSuggestion = 20;
      repSuggestion = 10;
      document.querySelectorAll('#exercises-day7 input[data-id$="t"]').forEach(input => {
        const newValue = 40;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    } else {
      weightSuggestion = 30;
      repSuggestion = 8;
      document.querySelectorAll('#exercises-day7 input[data-id$="t"]').forEach(input => {
        const newValue = 50;
        animateValue(input, 0, newValue, 500);
        localStorage.setItem(input.dataset.id, newValue);
      });
    }
    document.querySelectorAll('#exercises-day7 input[data-id$="w"]').forEach(input => {
      const newValue = weightSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });
    document.querySelectorAll('#exercises-day7 input[data-id$="r"]').forEach(input => {
      const newValue = repSuggestion;
      animateValue(input, 0, newValue, 500);
      localStorage.setItem(input.dataset.id, newValue);
    });

    showTips();
  }, 350); // Задержка 350 мс, чтобы обнуление завершилось
}

function shuffleExercises(dayId) {
  const exercisesList = document.getElementById(`exercises-${dayId}`);
  exercisesList.style.opacity = '0';
  setTimeout(() => {
    const alternatives = alternativeExercises[dayId];
    exercisesList.innerHTML = alternatives.map(ex => `
      <li>${ex.name} — ${ex.sets}<div class="track">${ex.track}</div></li>
    `).join('');
    exercisesList.style.opacity = '1';
    const newInputs = exercisesList.querySelectorAll('input');
    newInputs.forEach(input => input.addEventListener('input', saveProgress));
  }, 300);
}

inputs.forEach(input => input.addEventListener('input', saveProgress));
window.addEventListener('DOMContentLoaded', () => {
  loadProgress();
  showTips();
});