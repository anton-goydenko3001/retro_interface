// НАСТРОЙКА КНОПОК С ВЫПАДАЮЩИМИ МЕНЮ
export const topButtonsMenu = [
  {
    main: {
      name: "ВИДЕОСТОК",
      url: "https://youtube.com",
      desc: "Видео контент",
    },
    submenu: [
      {
        name: "ФАЙЛЫ/ФУТАЖИ",
        url: "https://dropbox.com",
        desc: "Файловое хранилище",
      },
      {
        name: "СЕКВЕСОРЫ",
        url: "https://github.com",
        desc: "Управление последовательностями",
      },
      {
        name: "ЭФФЕКТЫ",
        url: "https://after-effects.com",
        desc: "Визуальные эффекты",
      },
    ],
  },
  {
    main: {
      name: "БИРЖИ / РЫНКИ",
      url: "https://binance.com",
      desc: "Торговые площадки",
    },
    submenu: [
      {
        name: "СЧЕТ/ДЕПОЗИТ",
        url: "https://paypal.com",
        desc: "Управление счетом",
      },
      {
        name: "СЧЕТ / ESCROW",
        url: "https://escrow.com",
        desc: "Эскроу сервис",
      },
      {
        name: "СЧЕТ / WALLET",
        url: "https://metamask.io",
        desc: "Криптовалютный кошелек",
      },
    ],
  },
  {
    main: {
      name: "МАГАЗИН",
      url: "https://amazon.com",
      desc: "Интернет-магазин",
    },
    submenu: [
      { name: "ТОВАРЫ", url: "https://ebay.com", desc: "Каталог товаров" },
      { name: "УСЛУГИ", url: "https://fiverr.com", desc: "Каталог услуг" },
      { name: "ССЫЛКИ", url: "https://bit.ly", desc: "Управление ссылками" },
    ],
  },
  {
    main: { name: "AI ADS", url: "https://openai.com", desc: "AI реклама" },
    submenu: [
      {
        name: "SMM/MARKETING",
        url: "https://facebook.com",
        desc: "Социальный маркетинг",
      },
      {
        name: "НАСТРОЙКИ",
        url: "https://settings.com",
        desc: "Настройки системы",
      },
      {
        name: "РАСПРЕДЕЛИТЬ",
        url: "https://distribute.com",
        desc: "Система распределения",
      },
    ],
  },
  {
    main: {
      name: "AI АСИСТЕНТЫ",
      url: "https://chatgpt.com",
      desc: "AI помощники",
    },
    submenu: [
      {
        name: "Н8Н АСИСТЕНТ",
        url: "https://notion.so",
        desc: "Персональный ассистент",
      },
      {
        name: "КОММУНИКАТОР",
        url: "https://discord.com",
        desc: "Система связи",
      },
      {
        name: "CRM / BITRIX",
        url: "https://bitrix24.com",
        desc: "CRM система",
      },
    ],
  },
  {
    main: {
      name: "AI ГЕНЕРАТОРЫ",
      url: "https://midjourney.com",
      desc: "AI генерация",
    },
    submenu: [
      {
        name: "ФОТОГЕНЕРИН",
        url: "https://dall-e.com",
        desc: "Генерация изображений",
      },
      {
        name: "АУДИОГЕНЕРИН",
        url: "https://soundcloud.com",
        desc: "Генерация аудио",
      },
      {
        name: "ВИДЕОГЕНЕРИН",
        url: "https://runway.ml",
        desc: "Генерация видео",
      },
    ],
  },
  {
    main: {
      name: "ВИДЕОХОСТИНГ",
      url: "https://vimeo.com",
      desc: "Хостинг видео",
    },
    submenu: [
      {
        name: "КАНАЛЫ - А",
        url: "https://telegram.org",
        desc: "Каналы категории А",
      },
      {
        name: "КАНАЛЫ - Б",
        url: "https://whatsapp.com",
        desc: "Каналы категории Б",
      },
      {
        name: "КАНАЛЫ - В",
        url: "https://slack.com",
        desc: "Каналы категории В",
      },
    ],
  },
  {
    main: { name: "НСПЧ", url: "https://google.com", desc: "НСПЧ система" },
    submenu: [
      {
        name: "СЕРТИФИКАЦИЯ",
        url: "https://coursera.org",
        desc: "Сертификаты",
      },
      {
        name: "ЦФА / ПАТЕНТ",
        url: "https://patents.google.com",
        desc: "Цифровые активы",
      },
      {
        name: "ИСПОЛН. ЛИСТ",
        url: "https://docs.google.com",
        desc: "Исполнительные документы",
      },
    ],
  },
];

export const bottomSections = [
  {
    id: 1,
    options: ["Опция 1", "Опция 2", "Опция 3", "Опция 4", "Опция 5"],
    current: 0,
  },
  {
    id: 2,
    options: ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4", "Вариант 5"],
    current: 0,
  },
  {
    id: 3,
    options: ["Режим 1", "Режим 2", "Режим 3", "Режим 4", "Режим 5"],
    current: 0,
  },
  {
    id: 4,
    options: [
      "Настройка 1",
      "Настройка 2",
      "Настройка 3",
      "Настройка 4",
      "Настройка 5",
    ],
    current: 0,
  },
  {
    id: 5,
    options: ["Уровень 1", "Уровень 2", "Уровень 3", "Уровень 4", "Уровень 5"],
    current: 0,
  },
  {
    id: 6,
    options: [
      "Состояние 1",
      "Состояние 2",
      "Состояние 3",
      "Состояние 4",
      "Состояние 5",
    ],
    current: 0,
  },
  {
    id: 7,
    options: ["Фаза 1", "Фаза 2", "Фаза 3", "Фаза 4", "Фаза 5"],
    current: 0,
  },
  {
    id: 8,
    options: ["Блок 1", "Блок 2", "Блок 3", "Блок 4", "Блок 5"],
    current: 0,
  },
  {
    id: 9,
    options: ["Секция 1", "Секция 2", "Секция 3", "Секция 4", "Секция 5"],
    current: 0,
  },
  {
    id: 10,
    options: ["Канал 1", "Канал 2", "Канал 3", "Канал 4", "Канал 5"],
    current: 0,
  },
];
