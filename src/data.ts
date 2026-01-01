export type LinkItem = { label: string; href: string }

export type LanguageItem = { name: string; level: string }

export type StudyBadge = {
  src: string
  alt: string
  howToEarn: string
  href?: string
  frame?: 'gold' | 'purple' | 'blue'
}

export type StudyDiploma = {
  title: string
  description: string
}

export type StudyItem = {
  title: string
  place: string
  period: string
  description?: string[]
  bullets?: string[]
  details?: string | string[]
  badges?: StudyBadge[]
  diploma?: StudyDiploma
}

export type ExperienceItem = {
  role: string
  company?: string
  period: string
  details?: string[]
  summary?: string
}

export type ProjectItem = { name: string; description: string; href?: string; tags?: string[] }

export type Profile = {
  name: string
  role: string
  location: string
  avatar: { src: string; alt: string }
  summary: string
  languages: LanguageItem[]
  links: LinkItem[]
  studies: StudyItem[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
}

export type SimpleIconSpec = { slug: string; darkModeColor?: string; size?: number }

const preferJsdelivrSlugs = new Set(['openai', 'anthropic', 'githubcopilot', 'googlegemini'])

export function simpleIconFallbackSrc(slug: string) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`
}

export function simpleIconSrc({ slug, darkModeColor, size = 16 }: SimpleIconSpec) {
  if (preferJsdelivrSlugs.has(slug) && !darkModeColor) {
    return simpleIconFallbackSrc(slug)
  }
  const base = `https://cdn.simpleicons.org/${slug}`
  const colored = darkModeColor ? `${base}/_/${darkModeColor}` : base
  return `${colored}?viewbox=auto&size=${size}`
}

export const traeAiIconSrc = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/trae.svg'

export const simpleIconByName: Record<string, SimpleIconSpec> = {
  React: { slug: 'react' },
  TypeScript: { slug: 'typescript' },
  'Tailwind CSS': { slug: 'tailwindcss' },
  Vite: { slug: 'vite' },
  Supabase: { slug: 'supabase' },
  Git: { slug: 'git' },
  HTML: { slug: 'html5' },
  CSS: { slug: 'css3' },
  JavaScript: { slug: 'javascript' },
  PHP: { slug: 'php' },
  SQL: { slug: 'postgresql' },
  'Next.js': { slug: 'nextdotjs', darkModeColor: 'fff' },
  Sass: { slug: 'sass' },
  Bootstrap: { slug: 'bootstrap' },
  jQuery: { slug: 'jquery' },
  'Node.js': { slug: 'nodedotjs' },
  Express: { slug: 'express', darkModeColor: 'fff' },
  'REST APIs': { slug: 'openapiinitiative' },
  GraphQL: { slug: 'graphql' },
  PostgreSQL: { slug: 'postgresql' },
  MySQL: { slug: 'mysql' },
  MongoDB: { slug: 'mongodb' },
  SQLite: { slug: 'sqlite' },
  Vercel: { slug: 'vercel', darkModeColor: 'fff' },
  Netlify: { slug: 'netlify' },
  Docker: { slug: 'docker' },
  'GitHub Actions': { slug: 'githubactions' },
  Nginx: { slug: 'nginx' },
  Apache: { slug: 'apache' },
  'CI/CD': { slug: 'jenkins' },
  ChatGPT: { slug: 'openai' },
  Claude: { slug: 'anthropic' },
  'GitHub Copilot': { slug: 'githubcopilot' },
  Gemini: { slug: 'googlegemini' },
  Perplexity: { slug: 'perplexity' },
  Cursor: { slug: 'cursor' },
  'Android Studio': { slug: 'androidstudio' },
  'NetBeans IDE': { slug: 'apachenetbeanside' },
  Xcode: { slug: 'xcode' },
  Flutter: { slug: 'flutter' },
  Dart: { slug: 'dart' },
  Kotlin: { slug: 'kotlin' },
  Swift: { slug: 'swift' },
  'React Native': { slug: 'react' },
  Expo: { slug: 'expo' },
  Firebase: { slug: 'firebase' },
  Gradle: { slug: 'gradle' },
  GitHub: { slug: 'github', darkModeColor: 'fff' },
  'VS Code': { slug: 'visualstudiocode' },
  Postman: { slug: 'postman' },
  Figma: { slug: 'figma' },
  ESLint: { slug: 'eslint' },
  Prettier: { slug: 'prettier' },
  Jest: { slug: 'jest' },
  Vitest: { slug: 'vitest' },
  Cypress: { slug: 'cypress', darkModeColor: 'fff' },
  Playwright: { slug: 'playwright' },
  npm: { slug: 'npm' },
  pnpm: { slug: 'pnpm' },
  Yarn: { slug: 'yarn' },
  WordPress: { slug: 'wordpress' },
  cPanel: { slug: 'cpanel' },
  Windows: { slug: 'windows' },
  Linux: { slug: 'linux' },
  macOS: { slug: 'apple' },
  Android: { slug: 'android' },
  LinkedIn: { slug: 'linkedin' },
  'Sublime Text': { slug: 'sublimetext' },
  Azure: { slug: 'microsoftazure' },
  Amazon: { slug: 'amazon', darkModeColor: 'fff' },
  Blogger: { slug: 'blogger' },
  Gmail: { slug: 'gmail' },
  Outlook: { slug: 'microsoftoutlook' },
  Yahoo: { slug: 'yahoo' },
}

export const modernTech = [
  {
    name: 'React',
    icon: simpleIconByName.React,
  },
  {
    name: 'TypeScript',
    icon: simpleIconByName.TypeScript,
  },
  {
    name: 'Tailwind CSS',
    icon: simpleIconByName['Tailwind CSS'],
  },
  {
    name: 'Vite',
    icon: simpleIconByName.Vite,
  },
  {
    name: 'Supabase',
    icon: simpleIconByName.Supabase,
  },
  {
    name: 'Git',
    icon: simpleIconByName.Git,
  },
  {
    name: 'GitHub',
    icon: simpleIconByName.GitHub,
  },
  {
    name: 'Vercel',
    icon: simpleIconByName.Vercel,
  },
] as const

export const skillGroups = [
  {
    title: 'Lenguajes',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'PHP', 'SQL'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Sass', 'Bootstrap', 'jQuery'],
  },
  {
    title: 'Backend y APIs',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Bases de datos',
    items: ['Supabase', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
  },
  {
    title: 'Deploy y DevOps',
    items: ['Vercel', 'Netlify', 'Docker', 'GitHub Actions', 'Nginx', 'Apache', 'CI/CD'],
  },
  {
    title: 'Inteligencias artificiales',
    items: ['Trae AI', 'ChatGPT', 'Claude', 'GitHub Copilot', 'Gemini', 'Perplexity', 'Cursor'],
  },
  {
    title: 'Desarrollo móvil',
    items: [
      'Android Studio',
      'NetBeans IDE',
      'Xcode',
      'Flutter',
      'Dart',
      'Kotlin',
      'Swift',
      'React Native',
      'Expo',
      'Firebase',
      'Gradle',
    ],
  },
  {
    title: 'IDEs y herramientas',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Trae IDE',
      'Sublime Text',
      'Azure',
      'Amazon',
      'Blogger',
      'Postman',
      'Figma',
      'ESLint',
      'Prettier',
      'Jest',
      'Vitest',
      'Cypress',
      'Playwright',
      'npm',
      'pnpm',
      'Yarn',
      'WordPress',
      'cPanel',
    ],
  },
  {
    title: 'Sistemas operativos',
    items: ['Windows', 'Linux', 'macOS', 'Android'],
  },
] as const

export const profile: Profile = {
  name: 'Andres Osorio',
  role: 'Desarrollador Backend/Frontend (Fullstack)',
  location: 'Colombia',
  avatar: {
    src: '/avatar.jpg',
    alt: 'Foto de perfil de Andres Osorio',
  },
  summary:
    'Construyo productos web con React, TypeScript y buenas prácticas de UI/UX. Me enfoco en performance, accesibilidad y una experiencia de usuario clara.',
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'English', level: 'Intermedio' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/andresaoe' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andresaoe' },
  ],
  studies: [
    {
      title: 'Tecnología en Sistemas de Información',
      place: 'Institución Universitaria Antonio José Camacho',
      period: '2009–Actualidad',
      description: [
        'Ser Tecnólogo en Sistemas de Información de la UNICAMACHO es ser un experto en soluciones informáticas para las demandas actuales. Mi formación me capacita para:',
        'Me destaco en roles como desarrollador de software, analista de sistemas o administrador de bases de datos. Además, poseo habilidades comunicativas, pensamiento crítico, trabajo en equipo y responsabilidad ética. Preparado para el mundo digital, ser Tecnólogo en Sistemas de Información es un recurso valioso en cualquier entorno laboral.',
      ],
      bullets: [
        'Desarrollar software personalizado.',
        'Gestionar bases de datos con seguridad y eficiencia.',
        'Participar en proyectos informáticos de impacto.',
        'Administrar redes y sistemas con precisión.',
      ],
      details: ['Énfasis en Desarrollo Web y Móviles'],
      diploma: {
        title: 'Diplomado en redes Cisco CCNA',
        description:
          'Profesional con diplomado en Redes Cisco CCNA, con sólidos conocimientos en fundamentos de redes, direccionamiento IP, subnetting, enrutamiento y conmutación, así como en protocolos de red y conceptos de seguridad básica. Capaz de instalar, configurar y diagnosticar redes LAN y WAN, garantizando conectividad, estabilidad y buen rendimiento de la infraestructura tecnológica. Con enfoque en la resolución de problemas, buenas prácticas y adaptación a entornos empresariales.',
      },
      badges: [
        {
          src: 'https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png',
          alt: 'Insignia CCNA: Switching, Routing & Wireless Essentials',
          howToEarn:
            'Completar el curso “Switching, Routing, and Wireless Essentials” de Cisco (CCNA) y obtener este credencial; incluye actividades prácticas y laboratorios (por ejemplo, con Cisco Packet Tracer).',
          href: 'https://www.credly.com/org/cisco/badge/ccna-switching-routing-and-wireless-essentials.1',
        },
        {
          src: 'https://developers.google.com/profile/badges/community/gdg/chapter/badge.svg',
          alt: 'Google Developer Groups (GDG) Cali',
          howToEarn: 'Unirte a un Google Developer Group (por ejemplo, GDG Cali).',
          href: 'https://gdg.community.dev/gdg-cali/',
        },
        {
          src: 'https://developers.google.com/profile/badges/events/3P/SDGCPMeetup/badge.svg',
          alt: 'Evento: SDGCP Meetup',
          howToEarn: 'Asistir al evento/meetup SDGCP Meetup (insignia de evento).',
          href: 'https://developers.google.com/profile/badges/events/3P/SDGCPMeetup/badge.svg',
        },
        {
          src: 'https://developers.google.com/profile/badges/community/build-with-ai/2025/workshop-attendee/badge.svg',
          alt: 'Build with AI 2025: Workshop Attendee',
          howToEarn: 'Asistir a un evento o taller de la serie Build with AI 2025.',
          href: 'https://developers.google.com/profile/badges/community/build-with-ai/2025/workshop-attendee/badge.svg',
        },
        {
          src: 'https://developers.google.com/profile/badges/playlists/android/android-enterprise-build-apps/badge.svg',
          alt: 'Android: Android Enterprise (Build Apps)',
          howToEarn:
            'Completar la ruta de aprendizaje “Build enterprise apps on Android” y su quiz asociado.',
          href: 'https://developers.google.com/profile/badges/playlists/android/android-enterprise-build-apps/badge.svg',
        },
        {
          src: 'https://developers.google.com/profile/badges/community/dsc/2021/core_member/badge.svg',
          alt: 'DSC 2021: Core Member',
          howToEarn: 'Ser parte del core team de un Google Developer Student Club (GDSC) en 2021–2022.',
          href: 'https://developers.google.com/profile/badges/community/dsc/2021/core_member/badge.svg',
          frame: 'purple',
        },
        {
          src: '/microsoft-certified-associate-badge.svg',
          alt: 'Microsoft Certified: Associate',
          howToEarn:
            'Obtener una certificación Microsoft Certified de nivel Associate, aprobando el/los exámenes requeridos para esa certificación específica.',
          href: 'https://learn.microsoft.com/en-us/credentials/',
          frame: 'blue',
        },
        {
          src: '/microsoft-certified-fundamentals-badge.svg',
          alt: 'Microsoft Certified: Fundamentals',
          howToEarn:
            'Obtener una certificación Microsoft Certified Fundamentals, aprobando un examen de nivel Fundamentals correspondiente a la certificación elegida.',
          href: 'https://learn.microsoft.com/en-us/credentials/',
          frame: 'blue',
        },
        {
          src: '/microsoft-certified-specialty-badge.svg',
          alt: 'Microsoft Certified: Specialty',
          howToEarn:
            'Obtener una certificación Microsoft Certified de nivel Specialty, aprobando el examen requerido para una certificación de especialidad específica.',
          href: 'https://learn.microsoft.com/en-us/credentials/',
          frame: 'blue',
        },
      ],
    },
    {
      title: 'Cursos',
      place: 'Platzi / NetAcad / Microsoft Learn',
      period: '2023–2025',
      details: [
        '2025 · Curso de Lovable AI para crear páginas web (Platzi).',
        '2024 · Curso de Fundamentos de Python (NetAcad).',
        '2024 · Curso de Redes en Cisco Packet Tracer (NetAcad).',
        '2023 · Curso de Servicios en la nube de Azure (Microsoft Learn).',
        '2023 · Curso de programación básica (Platzi).',
      ],
    },
  ],
  experience: [
    {
      role: 'Freelance / Independiente',
      period: '2009-Actualidad',
      summary:
        'Soy desarrollador web con formación en Tecnologías en Sistemas de Información desde 2009 y experiencia continua trabajando de manera independiente/freelance en el diseño, desarrollo y mantenimiento de aplicaciones web. He sido testigo y partícipe de la evolución del desarrollo web, desde arquitecturas tradicionales hasta enfoques modernos, aplicando tecnologías frontend y backend, gestión de bases de datos y buenas prácticas de programación. Complemento mi experiencia con formación constante a través de Platzi, Microsoft Learn, Azure y Cisco Networking Academy, fortaleciendo conocimientos en desarrollo web moderno, servicios en la nube, redes y seguridad. Me enfoco en crear soluciones web funcionales, escalables y orientadas al rendimiento, adaptadas a las necesidades del negocio y del usuario final.',
    },
  ],
  projects: [
    {
      name: 'Control de Nómina by @andresaoe',
      description:
        'Este proyecto web es un dashboard tipo panel de control orientado a la gestión de nómina — es decir, a visualizar y administrar datos relacionados con mis pagos, mi información laboral y posiblemente el cálculo de salarios o seguimiento de períodos de pago, reportes mensuales y anuales, entre otras funciones.',
      href: 'https://github.com/andresaoe/nomina_andresaoe',
      tags: ['React', 'TypeScript', 'Supabase', 'Vercel'],
    },
    {
      name: 'Control de Nómina: andresaoe',
      description:
        'Este proyecto web es un dashboard tipo panel de control personal para el control de nómina, diseñada para registrar los días trabajados, las horas laboradas y los diferentes recargos (nocturnos, dominicales, festivos, etc.) calculando así un salario y sus reportes.',
      href: 'https://github.com/andresaoe/mi-jornada-calculada',
      tags: ['Tailwind', 'UI', 'Lovable AI', 'Google dev'],
    },
  ],
}
