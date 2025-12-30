import type { FormEvent } from 'react'
import { Fragment, useState } from 'react'
import { supabase } from './lib/supabaseClient'

type LinkItem = { label: string; href: string }

type LanguageItem = { name: string; level: string }

type StudyBadge = {
  src: string
  alt: string
  howToEarn: string
  href?: string
  frame?: 'gold' | 'purple' | 'blue'
}

type StudyDiploma = {
  title: string
  description: string
}

type StudyItem = {
  title: string
  place: string
  period: string
  description?: string[]
  bullets?: string[]
  details?: string | string[]
  badges?: StudyBadge[]
  diploma?: StudyDiploma
}

type ExperienceItem = {
  role: string
  company?: string
  period: string
  details?: string[]
  summary?: string
}

type ProjectItem = { name: string; description: string; href?: string; tags?: string[] }

type Profile = {
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

type SimpleIconSpec = { slug: string; darkModeColor?: string; size?: number }

function simpleIconSrc({ slug, darkModeColor, size = 16 }: SimpleIconSpec) {
  const base = `https://cdn.simpleicons.org/${slug}`
  const colored = darkModeColor ? `${base}/_/${darkModeColor}` : base
  return `${colored}?viewbox=auto&size=${size}`
}

function simpleIconFallbackSrc(slug: string) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`
}

const traeAiIconSrc = 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/trae.svg'

const simpleIconByName: Record<string, SimpleIconSpec> = {
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
}

type BrandIconProps = { name: string; size?: number; className?: string }

function BrandIcon({ name, size = 16, className = 'h-4 w-4' }: BrandIconProps) {
  if (name === 'Trae AI' || name === 'Trae IDE') {
    return (
      <img
        src={traeAiIconSrc}
        alt=""
        aria-hidden="true"
        className={className}
        loading="lazy"
        width={size}
        height={size}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }

  const spec = simpleIconByName[name]
  if (!spec) return null
  return (
    <img
      src={simpleIconSrc({ ...spec, size })}
      alt=""
      aria-hidden="true"
      className={className}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.dataset.fallback === '1') {
          e.currentTarget.style.display = 'none'
          return
        }
        e.currentTarget.dataset.fallback = '1'
        e.currentTarget.src = simpleIconFallbackSrc(spec.slug)
      }}
    />
  )
}

const modernTech = [
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
] as const

const skillGroups = [
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

const profile: Profile = {
  name: 'Andres Osorio',
  role: 'Desarrollador Backend/Frontend (Fullstack)',
  location: 'Colombia',
  avatar: {
    src: '/avatar.jpg',
    alt: 'Foto de perfil',
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

function App() {
  const sections = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'education', label: 'Educación' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'contact', label: 'Contacto' },
  ]

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<
    | { state: 'idle' }
    | { state: 'sending' }
    | { state: 'success'; message: string }
    | { state: 'error'; message: string }
  >({ state: 'idle' })

  const [activeBadgeSrc, setActiveBadgeSrc] = useState<string | null>(null)

  const educationBadges = profile.studies.flatMap((s) => s.badges ?? [])

  const supabaseEnvReady = Boolean(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY,
  )
  const supabaseReady = Boolean(supabase)

  async function handleSubmitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!supabase) {
      setContactStatus({
        state: 'error',
        message: 'Faltan variables de entorno de Supabase (URL / ANON KEY).',
      })
      return
    }

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity()
      setContactStatus({ state: 'error', message: 'Revisa los campos marcados.' })
      return
    }

    const normalizedName = contactName.trim().replace(/\s+/g, ' ')
    const normalizedEmail = contactEmail
      .trim()
      .replaceAll('\u00A0', '')
      .replaceAll('\u200B', '')
      .replaceAll('\u200C', '')
      .replaceAll('\u200D', '')
      .replaceAll('\uFEFF', '')
      .toLowerCase()
    const normalizedMessage = contactMessage.trim()

    const payload = {
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    }

    if (!payload.name || !payload.email || !payload.message) {
      setContactStatus({ state: 'error', message: 'Completa nombre, email y mensaje.' })
      return
    }

    if (payload.name.length < 2) {
      setContactStatus({ state: 'error', message: 'El nombre debe tener al menos 2 caracteres.' })
      return
    }

    if (payload.name.length > 80) {
      setContactStatus({ state: 'error', message: 'El nombre es demasiado largo.' })
      return
    }

    if (payload.email.length > 254) {
      setContactStatus({ state: 'error', message: 'El email es demasiado largo.' })
      return
    }

    if (/\s/.test(payload.email)) {
      setContactStatus({ state: 'error', message: 'El email no debe contener espacios.' })
      return
    }

    if (payload.message.length < 10) {
      setContactStatus({ state: 'error', message: 'El mensaje debe tener al menos 10 caracteres.' })
      return
    }

    if (payload.message.length > 2000) {
      setContactStatus({ state: 'error', message: 'El mensaje es demasiado largo.' })
      return
    }

    setContactStatus({ state: 'sending' })

    const { error } = await supabase.from('contact_messages').insert(payload)

    if (error) {
      const rawMessage = error.message ?? 'No se pudo enviar el mensaje.'
      const friendlyMessage = rawMessage.includes('relation "contact_messages" does not exist')
        ? 'Falta crear la tabla contact_messages en Supabase.'
        : rawMessage.includes('contact_messages_email_format')
          ? 'Supabase rechazó el email por la constraint contact_messages_email_format. Ajusta el CHECK en Supabase para aceptar emails válidos.'
        : rawMessage.includes('row-level security')
          ? 'Supabase está bloqueando el envío (RLS). Crea una policy de INSERT para la tabla contact_messages.'
          : rawMessage

      setContactStatus({ state: 'error', message: friendlyMessage })
      return
    }

    setContactName('')
    setContactEmail('')
    setContactMessage('')

    let notifyError: unknown = null
    try {
      const { error: invokeError } = await supabase.functions.invoke('send-contact-email', {
        body: payload,
      })
      notifyError = invokeError
    } catch (err) {
      notifyError = err
    }

    if (notifyError) {
      setContactStatus({
        state: 'success',
        message: 'Mensaje enviado. Si no recibes respuesta pronto, contáctame por LinkedIn.',
      })
      return
    }

    setContactStatus({ state: 'success', message: 'Mensaje enviado. Gracias.' })
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(56,189,248,0.20),transparent_60%),radial-gradient(900px_circle_at_85%_10%,rgba(167,139,250,0.18),transparent_55%),radial-gradient(700px_circle_at_40%_110%,rgba(34,197,94,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <header className="sticky top-0 z-30 -mx-4 mb-8 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-white/10">
                <img
                  src={profile.avatar.src}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = '/avatar.svg'
                  }}
                />
              </div>
              <div className="text-sm font-semibold tracking-tight text-white">{profile.name}</div>
            </div>
            <nav className="-mx-1 flex max-w-full flex-wrap items-center gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <aside className="md:sticky md:top-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="relative mb-4 w-fit">
                <div className="rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-300 p-[2px]">
                  <div className="rounded-[14px] bg-slate-950/60 p-1">
                    <img
                      src={profile.avatar.src}
                      alt={profile.avatar.alt}
                      className="h-28 w-28 rounded-xl object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/avatar.svg'
                      }}
                    />
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-2 right-0 rounded-lg bg-slate-950/70 px-2 py-1 text-xs font-semibold text-fuchsia-400 ring-1 ring-fuchsia-400/40">
                  Premium
                </div>
              </div>
              <a href="#hero" className="text-lg font-semibold tracking-tight text-white">
                {profile.name}
              </a>
              <div className="mt-2 text-sm text-slate-300">{profile.role}</div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {profile.location}
                </span>
                {profile.languages.map((l) => (
                  <span
                    key={l.name}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {l.name} ({l.level})
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {profile.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    <span className="text-slate-100">
                      <BrandIcon name={l.label} />
                    </span>
                    <span>{l.label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-7 flex gap-3">
                <a
                  href="#skills"
                  className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300"
                >
                  Ver habilidades
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Contactar
                </a>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <section id="hero" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="text-sm font-medium text-sky-300">Portafolio · Hoja de vida</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {profile.role}
              </h1>
              <p className="mt-4 max-w-prose text-justify text-sm leading-relaxed text-slate-300 md:text-base">
                {profile.summary}
              </p>
              <div className="mt-5 grid gap-3 text-justify text-sm leading-relaxed text-slate-300 md:text-base">
                <p>
                  Como desarrollador web moderno trabajo con React y TypeScript para construir interfaces rápidas y
                  mantenibles, usando Tailwind CSS y Vite para una experiencia de desarrollo ágil. Versiono y colaboro
                  con Git/GitHub, integro Supabase para autenticación y bases de datos, y despliego en Vercel con flujos
                  de CI/CD para entregar cambios de forma segura; además, consumo e integro APIs, cuido performance y
                  accesibilidad, y aplico buenas prácticas de testing cuando el proyecto lo requiere.
                </p>
                <p>
                  Trabajo con Trae AI dentro del IDE para acelerar el ciclo completo: exploración del código, ajustes de
                  UI, ejecución de comandos, validación con diagnósticos y pruebas rápidas en preview. Esto me permite
                  iterar rápido sin sacrificar calidad.
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="text-sm font-semibold text-white">Tecnologías</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {modernTech.map((t) => (
                    <div
                      key={t.name}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
                    >
                      <img
                        src={simpleIconSrc(t.icon)}
                        alt=""
                        aria-hidden="true"
                        className="h-4 w-4"
                        loading="lazy"
                      />
                      <span>{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" className="mt-8">
              <h2 className="text-xl font-semibold tracking-tight text-white">Sobre mí</h2>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mt-4 grid gap-3 text-justify text-sm leading-relaxed text-slate-300 md:text-base">
                  <p>
                    Me destaco por la comunicación clara, responsabilidad, mentalidad de mejora continua y trabajo en
                    equipo. Me adapto rápido a nuevos retos, priorizo bien y mantengo un enfoque orientado a resultados.
                  </p>
                  <p>
                    Como desarrollador web moderno, combino buenas prácticas de ingeniería (componentización, tipado
                    estricto, manejo de estado, accesibilidad y performance) con herramientas de IA para acelerar la
                    entrega sin perder control sobre la calidad.
                  </p>
                  <p>
                    Con Trae AI, optimizo el flujo diario: diseño de UI, refactors guiados, búsqueda de contexto en el
                    código, validación rápida y resolución de bugs. La IA me ayuda a iterar más rápido, proponer
                    alternativas y detectar inconsistencias, mientras yo mantengo la arquitectura, los estándares y la
                    revisión final.
                  </p>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold text-white">Enfoque</div>
                    <div className="mt-2 text-sm text-slate-300">Frontend moderno y DX sólida.</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold text-white">Calidad</div>
                    <div className="mt-2 text-sm text-slate-300">
                      Accesibilidad, testing y performance.
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                    <div className="text-sm font-semibold text-white">Colaboración</div>
                    <div className="mt-2 text-sm text-slate-300">Comunicación clara y entregas iterativas.</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="experience" className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight text-white">Experiencia</h2>
              <ol className="mt-4 grid gap-4 border-l border-white/10 pl-6">
                {profile.experience.map((e) => (
                  <li key={`${e.role}-${e.period}`} className="relative">
                    <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-sky-300/80" />
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-justify">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h3 className="text-base font-semibold text-white">{e.role}</h3>
                          {e.company ? <p className="mt-1 text-sm text-slate-200">{e.company}</p> : null}
                        </div>
                        <span className="text-sm text-slate-300">{e.period}</span>
                      </div>
                      {e.summary ? (
                        <p className="mt-4 text-justify text-sm leading-relaxed text-slate-300">{e.summary}</p>
                      ) : e.details?.length ? (
                        <ul className="mt-4 grid gap-2 text-sm text-slate-300">
                          {e.details.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="education" className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight text-white">Educación</h2>
              <ol className="mt-4 grid gap-4 border-l border-white/10 pl-6">
                {profile.studies.map((s) => (
                  <Fragment key={`${s.title}-${s.period}`}>
                    <li className="relative">
                      <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-violet-300/80" />
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-justify">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="text-base font-semibold text-white">{s.title}</h3>
                          <span className="text-sm text-slate-300">{s.period}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-200">{s.place}</p>
                        {s.description?.length
                          ? s.description.map((p, idx) => (
                              <p
                                key={`${s.title}-${s.period}-desc-${idx}`}
                                className="mt-3 text-sm text-slate-300"
                              >
                                {p}
                              </p>
                            ))
                          : null}
                        {s.bullets?.length ? (
                          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
                            {s.bullets.map((d) => (
                              <li key={`${s.title}-${s.period}-bullet-${d}`} className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {typeof s.details === 'string' ? (
                          <p className="mt-3 text-sm text-slate-300">{s.details}</p>
                        ) : s.details?.length ? (
                          s.details.map((p) => (
                            <p key={`${s.title}-${s.period}-detail-${p}`} className="mt-3 text-sm text-slate-300">
                              {p}
                            </p>
                          ))
                        ) : null}
                      </div>
                    </li>
                    {s.diploma ? (
                      <li className="relative">
                        <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-amber-300/80" />
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-justify">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h3 className="text-base font-semibold text-white">{s.diploma.title}</h3>
                            <span className="text-sm text-slate-300">2024</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-300">{s.diploma.description}</p>
                        </div>
                      </li>
                    ) : null}
                    {s.title === 'Cursos' && educationBadges.length ? (
                      <li className="relative">
                        <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-emerald-300/80" />
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-justify">
                          <div className="text-base font-semibold text-white">Insignias obtenidas</div>
                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            {educationBadges.map((b) => {
                              const frame = b.frame ?? 'gold'
                              const frameClass =
                                frame === 'purple'
                                  ? 'inline-flex rounded-2xl bg-gradient-to-br from-violet-300 via-fuchsia-500 to-violet-300 p-[2px] transition hover:from-violet-200 hover:via-fuchsia-400 hover:to-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300'
                                  : frame === 'blue'
                                    ? 'inline-flex rounded-2xl bg-gradient-to-br from-sky-300 via-blue-500 to-sky-300 p-[2px] transition hover:from-sky-200 hover:via-blue-400 hover:to-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300'
                                    : 'inline-flex rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-300 p-[2px] transition hover:from-amber-100 hover:via-yellow-400 hover:to-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300'

                              const isOpen = activeBadgeSrc === b.src

                              const content = (
                                <span className="rounded-[14px] bg-slate-950/60 p-1">
                                  <img
                                    src={b.src}
                                    alt={b.alt}
                                    className="h-16 w-16 rounded-xl object-contain"
                                    loading="lazy"
                                  />
                                </span>
                              )

                              const tooltip = isOpen ? (
                                <div className="pointer-events-none absolute left-1/2 top-0 z-20 w-72 -translate-x-1/2 -translate-y-full pb-2">
                                  <div className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-xs leading-relaxed text-slate-100 shadow-lg">
                                    {b.howToEarn}
                                  </div>
                                </div>
                              ) : null

                              return (
                                <span key={`${b.src}-${b.alt}`} className="relative inline-flex">
                                  {b.href ? (
                                    <a
                                      href={b.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className={frameClass}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setActiveBadgeSrc((prev) => (prev === b.src ? null : b.src))
                                      }}
                                    >
                                      {content}
                                    </a>
                                  ) : (
                                    <button
                                      type="button"
                                      className={frameClass}
                                      onClick={() => {
                                        setActiveBadgeSrc((prev) => (prev === b.src ? null : b.src))
                                      }}
                                    >
                                      {content}
                                    </button>
                                  )}
                                  {tooltip}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </li>
                    ) : null}
                  </Fragment>
                ))}
              </ol>
            </section>

            <section id="projects" className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight text-white">Proyectos</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {profile.projects.map((p) => (
                  <a
                    key={p.name}
                    href={p.href ?? '#'}
                    target={p.href ? '_blank' : undefined}
                    rel={p.href ? 'noreferrer' : undefined}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">{p.name}</h3>
                      <span className="text-slate-300 transition group-hover:translate-x-0.5">→</span>
                    </div>
                    <p className="mt-3 text-justify text-sm leading-relaxed text-slate-300">{p.description}</p>
                    {p.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </section>

            <section id="skills" className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight text-white">Habilidades</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {skillGroups.map((g) => (
                  <div key={g.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <span>{g.title}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {g.items.map((name) => {
                        const isTraeAi = g.title === 'Inteligencias artificiales' && name === 'Trae AI'
                        const className = isTraeAi
                          ? 'inline-flex items-center gap-2 rounded-full border border-fuchsia-400/35 bg-fuchsia-500/10 px-3 py-1.5 text-xs font-semibold text-fuchsia-300'
                          : 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10'
                        const content = (
                          <>
                            <span className="text-slate-100">
                              <BrandIcon name={name} />
                            </span>
                            <span>{name}</span>
                          </>
                        )

                        return isTraeAi ? (
                          <a
                            key={`${g.title}-${name}`}
                            href="https://www.trae.ai/"
                            target="_blank"
                            rel="noreferrer"
                            className={className}
                          >
                            {content}
                          </a>
                        ) : (
                          <span key={`${g.title}-${name}`} className={className}>
                            {content}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="contact" className="mt-10">
              <h2 className="text-xl font-semibold tracking-tight text-white">Contacto</h2>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="text-sm text-slate-300">¿Trabajamos juntos?</div>
                    <p className="mt-2 text-sm text-slate-300 md:text-base">
                      Envíame un mensaje y te responderé lo antes posible.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitContact} className="mt-6 grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="grid gap-2 text-sm">
                      <span className="text-slate-200">Nombre</span>
                      <input
                        required
                        minLength={2}
                        maxLength={80}
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="h-11 rounded-lg border border-white/10 bg-slate-950/40 px-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-300"
                        placeholder="Tu nombre"
                        autoComplete="name"
                        disabled={contactStatus.state === 'sending'}
                      />
                    </label>
                    <label className="grid gap-2 text-sm">
                      <span className="text-slate-200">Email</span>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="h-11 rounded-lg border border-white/10 bg-slate-950/40 px-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-300"
                        placeholder="tu@email.com"
                        autoComplete="email"
                        inputMode="email"
                        disabled={contactStatus.state === 'sending'}
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm">
                    <span className="text-slate-200">Mensaje</span>
                    <textarea
                      required
                      minLength={10}
                      maxLength={2000}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="min-h-28 rounded-lg border border-white/10 bg-slate-950/40 px-3 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-sky-300"
                      placeholder="Cuéntame en qué puedo ayudarte…"
                      disabled={contactStatus.state === 'sending'}
                    />
                  </label>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={!supabaseReady || contactStatus.state === 'sending'}
                      className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {contactStatus.state === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                    </button>

                    <div className="text-sm text-slate-300">
                      {!supabaseEnvReady
                        ? 'No se detectaron variables de Supabase. Reinicia el servidor de Vite.'
                        : !supabaseReady
                          ? 'No se pudo inicializar Supabase.'
                          : null}
                    </div>
                  </div>

                  {contactStatus.state === 'error' ? (
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
                      {contactStatus.message}
                    </div>
                  ) : null}
                  {contactStatus.state === 'success' ? (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                      {contactStatus.message}
                    </div>
                  ) : null}
                </form>
              </div>
            </section>

            <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>Hecho por @andresaoe y patrocinado por Trae AI la mejor inteligencia artificial</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
