import {
  NutritionPrinciple,
  FoodGuideline,
  HydrationGuideline,
  PracticeGuideline,
  HabitDef,
  TipRule,
} from '../models/nutrition.model';

export const PRINCIPLES: NutritionPrinciple[] = [
  {
    id: 'whole-foods',
    title: 'Основные акценты питания',
    bullets: [
      'Максимально натуральные продукты — свежие овощи, фрукты, зелень, ягоды, цельные крупы, орехи, семена, качественные белки.',
      'Цветная тарелка — чем больше оттенков ежедневно, тем больше антиоксидантов и фитонутриентов.',
      'Клетчатка 25–30 г в день (овощи, ягоды, семена чиа, лён, псиллиум).',
      'Белок в каждом приёме пищи — рыба, бобовые, яйца*, нежирное мясо, растительные источники.',
      'Полезные жиры ежедневно — авокадо, оливковое масло, орехи, семена, жирная рыба, кокос.',
    ],
  },
];

export const FOODS: FoodGuideline[] = [
  {
    id: 'avoid',
    category: 'avoid',
    items: [
      'Сахар и быстрые углеводы (белый хлеб, выпечка, сладости, газировка)',
      'Молочные продукты (особенно жирные и переработанные: сыр, сливки, мороженое)',
      'Глютенсодержащие продукты (белый хлеб, паста, выпечка)',
      'Красное и переработанное мясо (колбасы, сосиски, бекон)',
      'Жареное и трансжиры (фастфуд, маргарин, магазинные снеки)',
      'Алкоголь и избыток кофеина',
    ],
    notes: ['Почему: воспаление, нагрузка на печень/почки, повреждение мембран, ухудшение сна.'],
  },
];

export const HYDRATION: HydrationGuideline = {
  id: 'hydration',
  items: [
    '1,5–2 литра чистой воды в день',
    'Тёплая вода утром + капля цитрусового ЭМ',
    'Травяные чаи: имбирь, мята, ромашка, шиповник',
    'Вода с электролитами Recharge',
  ],
};

export const PRACTICES: PracticeGuideline = {
  id: 'support',
  items: [
    'Интервальное питание 12–14 часов ночью — поддержка аутофагии и митохондрий',
    'Медленные, осознанные приёмы пищи — лучшее пищеварение',
    'Сезонность: тыква, свёкла, яблоки, гранат, капуста, морковь',
  ],
};

// Trackable habits (daily + weekly)
export const HABITS: HabitDef[] = [
  {
    id: 'whole-foods-80',
    title: '≥80% натуральных продуктов',
    period: 'daily',
    type: 'boolean',
    weight: 10,
  },
  {
    id: 'colors-5',
    title: 'Цветная тарелка: ≥5 цветов',
    period: 'daily',
    type: 'counter',
    target: 5,
    weight: 10,
  },
  { id: 'fiber-30', title: 'Клетчатка 25–30 г', period: 'daily', type: 'boolean', weight: 12 },
  {
    id: 'protein-each',
    title: 'Белок в каждом приёме пищи',
    period: 'daily',
    type: 'boolean',
    weight: 12,
  },
  {
    id: 'good-fats',
    title: 'Полезные жиры в рационе',
    period: 'daily',
    type: 'boolean',
    weight: 8,
  },
  {
    id: 'water-8',
    title: 'Гидратация: 8–10 стаканов',
    period: 'daily',
    type: 'counter',
    target: 8,
    weight: 10,
  },
  { id: 'no-sugar-upf', title: 'Без сахара и UPF', period: 'daily', type: 'boolean', weight: 14 },
  { id: 'if-12h', title: '12–14 ч ночное окно', period: 'daily', type: 'boolean', weight: 10 },
  {
    id: 'mindful-eating',
    title: 'Осознанное питание',
    period: 'daily',
    type: 'boolean',
    weight: 8,
  },

  {
    id: 'plants-14',
    title: '14 разных растений/нед',
    period: 'weekly',
    type: 'counter',
    target: 14,
    weight: 16,
  },
  {
    id: 'herbal-3',
    title: '3 травяных чая/нед',
    period: 'weekly',
    type: 'counter',
    target: 3,
    weight: 8,
  },
  {
    id: 'if-3days',
    title: 'IF 12–14ч ≥3 дня/нед',
    period: 'weekly',
    type: 'counter',
    target: 3,
    weight: 10,
  },
  {
    id: 'seasonal-1',
    title: '1 сезонное блюдо/нед',
    period: 'weekly',
    type: 'counter',
    target: 1,
    weight: 6,
  },
];

// Contextual tips shown in Journal
export const TIPS: TipRule[] = [
  {
    id: 'tip-protein-am',
    text: 'Белок утром — топливо для митохондрий и энергии.',
    trigger: { kind: 'missingHabit', habitId: 'protein-each' },
  },
  {
    id: 'tip-veg-colors',
    text: 'Добавь яркие овощи — чем больше оттенков, тем больше антиоксидантов.',
    trigger: { kind: 'counterBelow', habitId: 'colors-5', min: 2 },
  },
  {
    id: 'tip-fiber',
    text: 'Чиа/лён/псиллиум помогут добрать клетчатку до 25–30 г.',
    trigger: { kind: 'missingHabit', habitId: 'fiber-30' },
  },
  {
    id: 'tip-hydration',
    text: 'Цель: 1,5–2 л воды + электролиты для мягкого детокса.',
    trigger: { kind: 'counterBelow', habitId: 'water-8', min: 4 },
  },
  {
    id: 'tip-no-sugar',
    text: 'Заменяй сладости на ягоды или 85% шоколад — без скачков сахара.',
    trigger: { kind: 'missingHabit', habitId: 'no-sugar-upf' },
  },
  {
    id: 'tip-if-window',
    text: 'Помни о 12–14 часах ночного окна — перезапуск метаболизма.',
    trigger: { kind: 'missingHabit', habitId: 'if-12h' },
  },
];
