// Копия файла workouts.js для дальнейших изменений
const workoutPlans = {
  day1: [
    [
      { name: "Жим лёжа", sets: "4×8", track: "Вес: <input type='number' data-id='0w'> кг Повт: <input type='number' data-id='0r'>" },
      { name: "Тяга в наклоне", sets: "4×10", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
      { name: "Жим гантелей сидя", sets: "3×10", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
      { name: "Бицепс", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
      { name: "Французский жим", sets: "3×12", track: "Вес: <input type='number' data-id='4w'> кг Повт: <input type='number' data-id='4r'>" }
    ],
    [
      { name: "Подтягивания", sets: "3×8", track: "Повт: <input type='number' data-id='0r'>" },
      { name: "Разведения гантелей лёжа", sets: "3×12", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
      { name: "Тяга штанги к подбородку", sets: "3×10", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
      { name: "Молотковый подъём на бицепс", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
      { name: "Отжимания на брусьях (трицепс)", sets: "3×10", track: "Повт: <input type='number' data-id='4r'>" }
    ],
    [
      { name: "Жим штанги узким хватом", sets: "4×8", track: "Вес: <input type='number' data-id='0w'> кг Повт: <input type='number' data-id='0r'>" },
      { name: "Тяга гантели одной рукой", sets: "3×10", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
      { name: "Разводки гантелей стоя", sets: "3×12", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
      { name: "Сгибания рук с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
      { name: "Разгибания рук с гантелью из-за головы", sets: "3×12", track: "Вес: <input type='number' data-id='4w'> кг Повт: <input type='number' data-id='4r'>" }
    ],
    [
      { name: "Жим лёжа на наклонной скамье", sets: "4×8", track: "Вес: <input type='number' data-id='0w'> кг Повт: <input type='number' data-id='0r'>" },
      { name: "Тяга вертикального блока", sets: "4×10", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
      { name: "Жим Арнольда", sets: "3×10", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
      { name: "Сгибания рук со штангой", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
      { name: "Отжимания с узким хватом", sets: "3×12", track: "Повт: <input type='number' data-id='4r'>" }
    ],
    [
      { name: "Жим гантелей лёжа", sets: "4×8", track: "Вес: <input type='number' data-id='0w'> кг Повт: <input type='number' data-id='0r'>" },
      { name: "Тяга штанги в наклоне обратным хватом", sets: "4×10", track: "Вес: <input type='number' data-id='1w'> кг Повт: <input type='number' data-id='1r'>" },
      { name: "Подъёмы гантелей через стороны", sets: "3×12", track: "Вес: <input type='number' data-id='2w'> кг Повт: <input type='number' data-id='2r'>" },
      { name: "Концентрированные сгибания на бицепс", sets: "3×12", track: "Вес: <input type='number' data-id='3w'> кг Повт: <input type='number' data-id='3r'>" },
      { name: "Разгибания рук на блоке", sets: "3×12", track: "Вес: <input type='number' data-id='4w'> кг Повт: <input type='number' data-id='4r'>" }
    ]
  ],
  day3: [
    [
      { name: "Приседания со штангой", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
      { name: "Румынская тяга", sets: "4×10", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
      { name: "Выпады с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
      { name: "Подъёмы на носки", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
      { name: "Планка", sets: "3×30-40 сек", track: "Длительность: <input type='number' data-id='9t'> сек" }
    ],
    [
      { name: "Жим ногами в тренажёре", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
      { name: "Становая тяга на прямых ногах", sets: "4×10", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
      { name: "Боковые выпады", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
      { name: "Степ-апы на скамью", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
      { name: "Ягодичный мостик", sets: "3×15", track: "Вес: <input type='number' data-id='9w'> кг Повт: <input type='number' data-id='9r'>" }
    ],
    [
      { name: "Фронтальные приседания", sets: "4×8", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
      { name: "Румынская тяга с гантелями", sets: "4×10", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
      { name: "Выпады назад с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
      { name: "Подъёмы на носки в тренажёре", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
      { name: "Боковая планка", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='9t'> сек" }
    ],
    [
      { name: "Приседания в тренажёре Смита", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
      { name: "Становая тяга сумо", sets: "4×8", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
      { name: "Болгарские сплит-приседания", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
      { name: "Подъёмы на носки сидя", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
      { name: "Скручивания на пресс", sets: "3×20", track: "Повт: <input type='number' data-id='9r'>" }
    ],
    [
      { name: "Гоблет-приседания", sets: "4×10", track: "Вес: <input type='number' data-id='5w'> кг Повт: <input type='number' data-id='5r'>" },
      { name: "Румынская тяга с одной ногой", sets: "3×12", track: "Вес: <input type='number' data-id='6w'> кг Повт: <input type='number' data-id='6r'>" },
      { name: "Выпады с шагом вперёд", sets: "3×12", track: "Вес: <input type='number' data-id='7w'> кг Повт: <input type='number' data-id='7r'>" },
      { name: "Подъёмы на носки с гантелями", sets: "3×15", track: "Вес: <input type='number' data-id='8w'> кг Повт: <input type='number' data-id='8r'>" },
      { name: "Русские скручивания", sets: "3×20", track: "Повт: <input type='number' data-id='9r'>" }
    ]
  ],
  day5: [
    [
      { name: "Бёрпи", sets: "3×10", track: "Повт: <input type='number' data-id='10r'>" },
      { name: "Скейтеры", sets: "3×20", track: "Повт: <input type='number' data-id='11r'>" },
      { name: "Прыжки на скакалке", sets: "3×1 мин", track: "Длительность: <input type='number' data-id='12t'> сек" },
      { name: "Альпинист", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
      { name: "Велосипед (пресс)", sets: "3×15", track: "Повт: <input type='number' data-id='14r'>" }
    ],
    [
      { name: "Прыжки с разведением рук и ног", sets: "3×30", track: "Повт: <input type='number' data-id='10r'>" },
      { name: "Спринты на месте", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='11t'> сек" },
      { name: "Прыжки на коробку", sets: "3×12", track: "Повт: <input type='number' data-id='12r'>" },
      { name: "Подъёмы коленей к груди", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
      { name: "Русские скручивания", sets: "3×20", track: "Повт: <input type='number' data-id='14r'>" }
    ],
    [
      { name: "Бёрпи с отжиманием", sets: "3×10", track: "Повт: <input type='number' data-id='10r'>" },
      { name: "Прыжки в длину", sets: "3×15", track: "Повт: <input type='number' data-id='11r'>" },
      { name: "Прыжки на скакалке с двойным оборотом", sets: "3×45 сек", track: "Длительность: <input type='number' data-id='12t'> сек" },
      { name: "Альпинист с поворотом", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
      { name: "Подъёмы ног в висе", sets: "3×15", track: "Повт: <input type='number' data-id='14r'>" }
    ],
    [
      { name: "Прыжки звёздочкой", sets: "3×30", track: "Повт: <input type='number' data-id='10r'>" },
      { name: "Скейтеры с касанием пола", sets: "3×20", track: "Повт: <input type='number' data-id='11r'>" },
      { name: "Прыжки через препятствие", sets: "3×15", track: "Повт: <input type='number' data-id='12r'>" },
      { name: "Боковые прыжки", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
      { name: "Скручивания на пресс с поворотом", sets: "3×20", track: "Повт: <input type='number' data-id='14r'>" }
    ],
    [
      { name: "Бёрпи с прыжком в длину", sets: "3×12", track: "Повт: <input type='number' data-id='10r'>" },
      { name: "Прыжки на месте с высоким коленом", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='11t'> сек" },
      { name: "Прыжки на скакалке с переменным темпом", sets: "3×1 мин", track: "Длительность: <input type='number' data-id='12t'> сек" },
      { name: "Альпинист с прыжком", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='13t'> сек" },
      { name: "Планка с касанием плеча", sets: "3×20", track: "Повт: <input type='number' data-id='14r'>" }
    ]
  ],
  day7: [
    [
      { name: "Становая тяга", sets: "4×8", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
      { name: "Жим штанги стоя", sets: "3×10", track: "Вес: <input type='number' data-id='16w'> кг Повт: <input type='number' data-id='16r'>" },
      { name: "Тяга штанги к поясу", sets: "3×10", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>" },
      { name: "Приседания с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
      { name: "Планка с подтягиванием коленей", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='19t'> сек" }
    ],
    [
      { name: "Тяга в тренажёре (сидя)", sets: "3×10", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
      { name: "Отжимания с узкой постановкой рук", sets: "3×12", track: "Повт: <input type='number' data-id='16r'>" },
      { name: "Гоблет-приседания", sets: "3×12", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>" },
      { name: "Русские скручивания с весом", sets: "3×15", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
      { name: "Бёрпи с отжиманием", sets: "3×10", track: "Повт: <input type='number' data-id='19r'>" }
    ],
    [
      { name: "Становая тяга сумо", sets: "4×8", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
      { name: "Жим гантелей сидя", sets: "3×10", track: "Вес: <input type='number' data-id='16w'> кг Повт: <input type='number' data-id='16r'>" },
      { name: "Тяга гантели одной рукой", sets: "3×10", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>" },
      { name: "Выпады с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
      { name: "Скручивания на пресс", sets: "3×20", track: "Повт: <input type='number' data-id='19r'>" }
    ],
    [
      { name: "Жим ногами в тренажёре", sets: "4×10", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
      { name: "Отжимания", sets: "3×12", track: "Повт: <input type='number' data-id='16r'>" },
      { name: "Тяга вертикального блока", sets: "3×10", track: "Вес: <input type='number' data-id='17w'> кг Повт: <input type='number' data-id='17r'>" },
      { name: "Приседания с гантелями", sets: "3×12", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
      { name: "Планка", sets: "3×30 сек", track: "Длительность: <input type='number' data-id='19t'> сек" }
    ],
    [
      { name: "Румынская тяга", sets: "4×10", track: "Вес: <input type='number' data-id='15w'> кг Повт: <input type='number' data-id='15r'>" },
      { name: "Жим штанги лёжа", sets: "4×8", track: "Вес: <input type='number' data-id='16w'> кг Повт: <input type='number' data-id='16r'>" },
      { name: "Подтягивания", sets: "3×8", track: "Повт: <input type='number' data-id='17r'>" },
      { name: "Болгарские сплит-приседания", sets: "3×12", track: "Вес: <input type='number' data-id='18w'> кг Повт: <input type='number' data-id='18r'>" },
      { name: "Русские скручивания", sets: "3×20", track: "Повт: <input type='number' data-id='19r'>" }
    ]
  ]
};

console.log("workouts_copy.js загружен успешно."); // Отладка