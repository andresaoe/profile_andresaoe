import type { FormEvent } from 'react'
import { Fragment, useState } from 'react'
import {
  modernTech,
  profile,
  simpleIconByName,
  simpleIconFallbackSrc,
  simpleIconSrc,
  skillGroups,
  traeAiIconSrc,
} from './data'

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

  const [navOpen, setNavOpen] = useState(false)

  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactStatus, setContactStatus] = useState<
    | { state: 'idle' }
    | { state: 'error'; message: string }
  >({ state: 'idle' })

  const [activeBadgeSrc, setActiveBadgeSrc] = useState<string | null>(null)

  const educationBadges = profile.studies.flatMap((s) => s.badges ?? [])

  function openEmailClient(provider: 'gmail' | 'outlook' | 'yahoo' | 'default') {
    const normalizedName = contactName.trim().replace(/\s+/g, ' ')
    const normalizedMessage = contactMessage.trim()

    if (!normalizedName || !normalizedMessage) {
      setContactStatus({ state: 'error', message: 'Por favor completa nombre y mensaje antes de enviar.' })
      return
    }
    setContactStatus({ state: 'idle' })

    const subject = `Contacto desde Portafolio: ${normalizedName}`
    const body = `Nombre: ${normalizedName}\nEmail de contacto: ${contactEmail}\n\nMensaje:\n${normalizedMessage}`
    const to = 'andresaoe@gmail.com'

    let url = ''

    switch (provider) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      case 'outlook':
        url = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${to}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      case 'yahoo':
        url = `https://compose.mail.yahoo.com/?to=${to}&subj=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
      case 'default':
      default:
        url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        break
    }

    window.open(url, '_blank')
  }

  function handleSubmitContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Por defecto abrimos el cliente de correo predeterminado
    openEmailClient('default')
  }

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(56,189,248,0.20),transparent_60%),radial-gradient(900px_circle_at_85%_10%,rgba(167,139,250,0.18),transparent_55%),radial-gradient(700px_circle_at_40%_110%,rgba(34,197,94,0.12),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <header className="sticky top-0 z-30 -mx-4 mb-8 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
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
            <nav className="-mx-1 hidden max-w-full flex-wrap items-center gap-1 md:flex">
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
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 md:hidden"
              aria-expanded={navOpen}
              aria-controls="mobile-nav"
              onClick={() => setNavOpen((prev) => !prev)}
            >
              <span className="sr-only">Abrir menú</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5 text-slate-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {navOpen ? (
                  <>
                    <path d="M18 6 6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
          <nav
            id="mobile-nav"
            className={navOpen ? 'mt-3 grid gap-1 md:hidden' : 'hidden md:hidden'}
          >
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                onClick={() => setNavOpen(false)}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </header>

        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <aside className="md:sticky md:top-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
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
                <div className="pointer-events-none absolute -bottom-2 right-0 rounded-lg bg-slate-950 px-2 py-1 text-xs font-semibold text-fuchsia-400 ring-1 ring-fuchsia-400/40">
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
                    rel="noopener noreferrer"
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
                  Habilidades
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
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Sobre mí</h2>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Experiencia</h2>
              <ol className="mt-4 grid gap-4 border-l border-white/10 pl-5 sm:pl-6">
                {profile.experience.map((e) => (
                  <li key={`${e.role}-${e.period}`} className="relative">
                    <span className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-sky-300/80 sm:-left-[29px]" />
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-justify sm:p-6">
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Educación</h2>
              <ol className="mt-4 grid gap-4 border-l border-white/10 pl-5 sm:pl-6">
                {profile.studies.map((s) => (
                  <Fragment key={`${s.title}-${s.period}`}>
                    <li className="relative">
                      <span className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-violet-300/80 sm:-left-[29px]" />
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-justify sm:p-6">
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
                        <span className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-amber-300/80 sm:-left-[29px]" />
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-justify sm:p-6">
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
                        <span className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border border-white/20 bg-emerald-300/80 sm:-left-[29px]" />
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-justify sm:p-6">
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
                                <div className="pointer-events-none absolute left-1/2 top-0 z-20 w-72 max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-full pb-2">
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
                                      rel="noopener noreferrer"
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Proyectos</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {profile.projects.map((p) => (
                  <a
                    key={p.name}
                    href={p.href ?? '#'}
                    target={p.href ? '_blank' : undefined}
                    rel={p.href ? 'noopener noreferrer' : undefined}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 sm:p-6"
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Habilidades</h2>
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
                            rel="noopener noreferrer"
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
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">Contacto</h2>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8">
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
                        disabled={false}
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
                      disabled={false}
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
                    disabled={false}
                  />
                </label>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                      >
                        Enviar (App por defecto)
                      </button>

                      <span className="text-sm text-slate-400">o enviar con:</span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEmailClient('gmail')}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          title="Abrir en Gmail"
                        >
                          <BrandIcon name="Gmail" className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only">Gmail</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openEmailClient('outlook')}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          title="Abrir en Outlook"
                        >
                          <BrandIcon name="Outlook" className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only">Outlook</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => openEmailClient('yahoo')}
                          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                          title="Abrir en Yahoo"
                        >
                          <BrandIcon name="Yahoo" className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only">Yahoo</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {contactStatus.state === 'error' ? (
                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">
                      {contactStatus.message}
                    </div>
                  ) : null}

                </form>
              </div>
            </section>

            <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="w-full text-center sm:w-auto sm:text-left">
                  Hecho por @andresaoe y patrocinado por Trae AI la mejor inteligencia artificial
                </span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
