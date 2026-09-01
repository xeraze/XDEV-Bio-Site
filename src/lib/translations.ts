const translations = {
  en: {
    meta: {
      title: 'xeraze',
      description: "xeraze — fullstack developer from Ukraine. C/C++/C#, Rust, Python, TypeScript and more. Let's build!",
    },
    hero: {
      eyebrow: 'who am i',
      subtitle: 'Dmitriy, 16 y.o, Ukraine — developing programs on various languages turned-key.',
      connecting: 'connecting to discord…',
      viewProjects: './view_projects',
      contact: './contact',
    },
    about: {
      eyebrow: 'about',
      title: 'A bit about me',
      text: "I'm xeraze — a fullstack developer from Ukraine, focused on writing clean, maintainable code and shipping things that actually work. I like spreading myself across languages instead of settling into one comfortable stack, and I plan to continue developing this approach further: more languages, more projects, more solutions.",
      readMore: 'read more →',
      backendLabel: '$ ls ./backend',
      frontendLabel: '$ ls ./frontend',
      modalEyebrow: 'about.md',
      modalText: "xeraze, 16 y.o, a fullstack developer from Ukraine. My main interests are coding and gaming. I provide high-quality work and stick to deadlines when they're specified. Pricelist: xeraze.github.io/Pricelist — I usually respond fastest on Discord. If you're sending a work order, please make it well-structured and detailed; without that I can't guarantee the result matches what you had in mind. In most cases I'll start on your project right away.",
      modalFootnote: "(If an employer is reading this — I'd like to work with you.)",
    },
    projects: {
      eyebrow: 'projects',
      title: 'git log --pinned',
      subtitle: 'Live from GitHub — stars, language, and last commit time pull straight from the repos, so this list never goes stale.',
      committed: 'committed',
      empty: "Couldn't load projects right now — check back in a bit.",
    },
    contact: {
      eyebrow: 'contact',
      title: "Let's talk",
      subtitle: 'Fastest response is on Discord. Everything else works too.',
      discord: 'Discord — xeraze.',
      pricelist: 'view pricelist →',
      copied: 'Copied "xeraze." to clipboard',
    },
    footer: {
      built: 'built with',
      deployed: 'deployed on',
    },
    lang: {
      en: 'EN',
      ru: 'RU',
    },
  },
  ru: {
    meta: {
      title: 'xeraze',
      description: 'xeraze — фуллстек разработчик из Украины. C/C++/C#, Rust, Python, TypeScript и многое другое. Давайте строить!',
    },
    hero: {
      eyebrow: 'кто я',
      subtitle: 'Дмитрий, 16 лет, Украина — разрабатываю программы на разных языках под ключ.',
      connecting: 'подключение к discord…',
      viewProjects: './просмотр_проектов',
      contact: './контакты',
    },
    about: {
      eyebrow: 'обо мне',
      title: 'Немного обо мне',
      text: 'Я xeraze — фуллстек разработчик из Украины, специализируюсь на чистом, поддерживаемом коде и работающих решениях. Мне нравится пробовать разные языки вместо того, чтобы оставаться на одном удобном стеке, и я планирую продолжать этот подход: больше языков, больше проектов, больше решений.',
      readMore: 'читать далее →',
      backendLabel: '$ ls ./backend',
      frontendLabel: '$ ls ./frontend',
      modalEyebrow: 'обо_мне.md',
      modalText: 'xeraze, 16 лет, фуллстек разработчик из Украины. Мои основные интересы — коддинг и гейминг. Я предоставляю качественную работу и придерживаюсь дедлайнов, если они указаны. Прайслист: xeraze.github.io/Pricelist — обычно я отвечаю быстрее всего в Discord. Если вы оформляете заказ, пожалуйста, сделайте его структурированным и подробным; без этого я не могу гарантировать, что результат будет соответствовать вашим ожиданиям. В большинстве случаев я начну работу над вашим проектом сразу.',
      modalFootnote: '(Если это читает какой-то работодатель — я бы с радостью поработал с вами.)',
    },
    projects: {
      eyebrow: 'проекты',
      title: 'git log --pinned',
      subtitle: 'Это информация прямо с GitHub! Звёзды, язык и время последнего коммита тянутся прямо из репозиториев, поэтому список всегда актуален.',
      committed: 'последний коммит',
      empty: 'Не удалось загрузить проекты — попробуйте позже.',
    },
    contact: {
      eyebrow: 'контакты',
      title: 'Давайте поговорим',
      subtitle: 'Быстрее всего отвечаю в Discord. Остальное тоже работает.',
      discord: 'Discord — xeraze.',
      pricelist: 'смотреть прайслист >',
      copied: '"xeraze." скопирован в буфер обмена',
    },
    footer: {
      built: 'сделано на',
      deployed: 'задеплоено на',
    },
    lang: {
      en: 'EN',
      ru: 'RU',
    },
  },
} as const;

export default translations;
export type Locale = keyof typeof translations;
export type TranslationKey = typeof translations.en;
