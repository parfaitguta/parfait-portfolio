
import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import {
  Mail,
  Phone,
  MessageCircle,
  Camera,
  Users,
  ArrowUpRight,
  Download,
  Code2,
  Menu,
  X,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Database,
  Smartphone,
  Server,
  Wrench,
  Globe,
  Layers,
  ExternalLink,
  Award,
  Send,
} from 'lucide-react'

const navigation = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact']

const titles = [
  'Software Engineering Student',
  'Full-Stack Developer',
  'React & Node.js Developer',
]

// Animation settings
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardAnimation = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const viewportSettings = {
  once: true,
  amount: 0.2,
}

const skillGroups = [
  {
    title: 'Frontend Development',
    icon: Globe,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
  },
  {
    title: 'Backend Development',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    title: 'Mobile Development',
    icon: Smartphone,
    skills: ['React Native', 'Expo'],
  },
  {
    title: 'Database Management',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'SQL'],
  },
  {
    title: 'Development Tools',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Swagger'],
  },
  {
    title: 'Software Engineering',
    icon: Layers,
    skills: [
      'Object-Oriented Programming',
      'API Integration',
      'Database Design',
      'Problem Solving',
    ],
  },
]

const projects = [
  {
    number: '01',
    title: 'Smart Rental System',
    category: 'Full-Stack Web Application',
    description:
      'A rental property management platform that connects landlords, renters, and administrators. It supports property discovery, rental management, payments, and communication.',
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    status: 'Featured Project',
    github: 'https://github.com/parfaitguta/smart-rental',
    demo: 'https://smartrental-rw.netlify.app/',
    image: '/images/projects/smart-rental.jpg',
  },
  {
    number: '02',
    title: 'Guta Events',
    category: 'Event Management Platform',
    description:
      'A digital event management platform that helps organizers manage events and attendees discover events, register, and access digital tickets.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    status: 'Personal Project',
    github: 'https://github.com/parfaitguta/gutaevents',
    demo: '',
    image: '/images/projects/guta-events.jpg',
  },
  {
    number: '03',
    title: 'Guta Express',
    category: 'E-Ticketing System',
    description:
      'An e-ticketing and transport management project focused on simplifying ticket-related processes and improving the passenger experience.',
    technologies: ['JavaScript', 'Node.js', 'MySQL'],
    status: 'In Development',
    github: '',
    demo: '',
    image: '/images/projects/guta-express.jpg',
  },
]

// CERTIFICATES
// Files live in public/certificates/ (preview image + PDF).
// date and detail are optional, leave them as '' to hide them.
const certificates = [
  {
    title: 'Digital Competency Passport',
    issuer: 'Digital Skills Foundation',
    date: 'June 2023',
    detail: 'Passed all 10 modules, including IT security, databases and productivity tools.',
    image: '/certificates/digital-competency-passport.jpg',
    link: '/certificates/digital-competency-passport.pdf',
  },
  {
    title: 'Introduction to Network Operations',
    issuer: 'Internet Society Learning',
    date: '',
    detail: 'Completed the full learning plan on how networks are run and maintained.',
    image: '/certificates/network-operations.jpg',
    link: '/certificates/network-operations.pdf',
  },
  {
    title: 'Full-Stack Software Development & Product Design',
    issuer: 'SANTECH (SAN HUB)',
    date: '',
    detail: '2-month intensive training covering frontend and backend development.',
    image: '/certificates/santech-fullstack.jpg',
    link: '/certificates/santech-fullstack.pdf',
  },
]

function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      transition={{ duration: 0.7 }}
      className="mb-14 max-w-2xl"
    >
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 leading-7 text-slate-400">{description}</p>
      )}
    </motion.div>
  )
}

// lucide-react has no TikTok icon, so it is drawn here as an inline SVG
function TikTokIcon({ size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

const currentYear = new Date().getFullYear()

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Scroll progress indicator
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const currentTitle = titles[titleIndex]

    // Pause briefly after the complete title has been typed.
    if (!isDeleting && displayedTitle === currentTitle) {
      const pause = setTimeout(() => setIsDeleting(true), 1400)
      return () => clearTimeout(pause)
    }

    // Move to the next title after the current one has been erased.
    if (isDeleting && displayedTitle === '') {
      const pause = setTimeout(() => {
        setIsDeleting(false)
        setTitleIndex((previous) => (previous + 1) % titles.length)
      }, 350)
      return () => clearTimeout(pause)
    }

    const typingSpeed = isDeleting ? 45 : 90
    const timer = setTimeout(() => {
      setDisplayedTitle(
        isDeleting
          ? currentTitle.slice(0, -1)
          : currentTitle.slice(0, displayedTitle.length + 1),
      )
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayedTitle, isDeleting, titleIndex])

  const closeMenu = () => setMenuOpen(false)

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen overflow-hidden bg-[#080d19] text-slate-300">
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
        style={{ scaleX }}
      />

      {/* NAVIGATION */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#080d19]/90 backdrop-blur-xl"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">

          <motion.a
            href="#home"
            onClick={closeMenu}
            whileHover={{ scale: 1.08 }}
            className="text-2xl font-black tracking-tight text-white"
          >
            PG<span className="text-cyan-400">.</span>
          </motion.a>

          <div className="hidden items-center gap-5 lg:gap-8 md:flex">
            {navigation.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -3 }}
                className="text-sm font-medium text-slate-400 transition hover:text-cyan-400"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <motion.a
              href="https://github.com/parfaitguta"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              <Code2 size={17} />
              GitHub
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-cyan-400/50 px-5 py-2.5 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-400 hover:text-[#080d19]"
            >
              Let's Talk
            </motion.a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
          >
            <motion.span
              key={menuOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/10 bg-[#080d19] px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-5">
              {navigation.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="text-sm font-medium text-slate-300 transition hover:text-cyan-400"
                >
                  {item}
                </motion.a>
              ))}

              <a
                href="https://github.com/parfaitguta"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400"
              >
                <Code2 size={18} />
                Visit My GitHub
              </a>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>

        {/* HOME */}
        <section
          id="home"
          className="relative flex min-h-screen scroll-mt-24 items-center px-6 pb-20 pt-32 lg:px-10"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]"
          />

          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
          />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2">

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="mb-6 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400"
              >
                <span className="h-px w-10 bg-cyan-400" />
                Welcome to my portfolio
              </motion.p>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
              >
                Hi, I'm
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Parfait Guta
                </span>
              </motion.h1>

              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-6 min-h-[2.5rem] text-xl font-semibold text-slate-200 sm:min-h-[3rem] sm:text-2xl"
                aria-label={titles[titleIndex]}
              >
                <span>{displayedTitle}</span>
                <span className="ml-1 inline-block text-cyan-400 animate-pulse" aria-hidden="true">
                  |
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-6 max-w-xl text-base leading-8 text-slate-400"
              >
                I am a Software Engineering student at the University of Lay
                Adventists of Kigali, passionate about building modern,
                responsive, and user-friendly digital solutions. I enjoy
                turning ideas into practical applications through code,
                creativity, and problem-solving.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 font-bold text-[#080d19] transition hover:bg-cyan-300"
                >
                  View My Work
                  <ArrowUpRight size={18} />
                </motion.a>

                <motion.a
                  href="/cv.pdf"
                  download
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Download CV
                  <Download size={18} />
                </motion.a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="mt-12 flex items-center gap-5"
              >
                <span className="text-sm text-slate-500">
                  Explore my work
                </span>

                <span className="h-px w-12 bg-slate-700" />

                <motion.a
                  href="#about"
                  aria-label="Go to about section"
                  whileHover={{ rotate: 45, scale: 1.15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-cyan-400 transition hover:border-cyan-400 hover:bg-cyan-400/10"
                >
                  <ArrowUpRight size={20} />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 35 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-md"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-blue-600/10 blur-2xl" />

                <div className="relative rounded-[2rem] border border-cyan-400/30 bg-[#101a2b] p-3 shadow-2xl shadow-cyan-950/40">
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#0b1424]">
                    <motion.img
                      src="/images/profile.jpg"
                      alt="Parfait Guta"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-[4/5] w-full object-cover object-center"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>

                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-[#111d30] px-6 py-4 shadow-xl"
                  >
                    <p className="text-2xl font-black text-cyan-400">PG</p>
                    <p className="text-xs text-slate-400">Developer & Creator</p>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -right-5 top-10 rounded-xl border border-cyan-400/20 bg-[#111d30] px-4 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-cyan-400"
                      />
                      <span className="text-xs font-medium text-white">
                        Open to opportunities
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-white/5 bg-[#0b1220] px-6 py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Get to know me"
              title="About Me"
              description="A little about my background, my journey, and what motivates me as a developer."
            />

            <div className="grid gap-12 lg:grid-cols-2">

              <motion.div
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                transition={{ duration: 0.8 }}
              >
                <h3 className="mb-5 text-2xl font-bold text-white">
                  Building ideas into digital experiences.
                </h3>

                <p className="mb-5 leading-8 text-slate-400">
                  I am a Software Engineering student at the University of Lay
                  Adventists of Kigali (UNILAK). My interests include web
                  development, application development, database systems, and
                  solving real-world problems with technology.
                </p>

                <p className="leading-8 text-slate-400">
                  I believe in continuous learning, teamwork, and writing
                  solutions that are useful, maintainable, and easy to use.
                  My goal is to keep improving my technical skills while
                  building software that makes a meaningful difference.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['Creative Thinking', 'Problem Solving', 'Teamwork'].map(
                    (item, index) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportSettings}
                        transition={{ delay: index * 0.12 }}
                        whileHover={{ y: -4, scale: 1.05 }}
                        className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-300"
                      >
                        {item}
                      </motion.span>
                    ),
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="space-y-5"
              >
                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="rounded-2xl border border-white/10 bg-[#101a2b] p-7"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                      <GraduationCap size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">Education</h3>
                      <p className="text-sm text-slate-500">
                        Academic Background
                      </p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-slate-200">
                    University of Lay Adventists of Kigali
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Bachelor of Software Engineering
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    2024 – Present
                  </p>
                </motion.div>

                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="rounded-2xl border border-white/10 bg-[#101a2b] p-7"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                      <Briefcase size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        Practical Experience
                      </h3>
                      <p className="text-sm text-slate-500">
                        Learning Through Practice
                      </p>
                    </div>
                  </div>

                  <h4 className="font-semibold text-slate-200">
                    Software Development Experience
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Developing practical skills through software projects,
                    technical learning, and hands-on experience.
                  </p>
                </motion.div>

                <motion.div
                  variants={cardAnimation}
                  whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.4)' }}
                  className="rounded-2xl border border-white/10 bg-[#101a2b] p-7"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                      <Lightbulb size={25} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">Interests</h3>
                      <p className="text-sm text-slate-500">
                        What Drives Me
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-400">
                    Full-stack development, emerging technologies, mobile
                    applications, UI/UX design, and building solutions to
                    everyday challenges.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          id="skills"
          className="scroll-mt-24 px-6 py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="My capabilities"
              title="Skills & Technologies"
              description="Technologies and tools I use to design, develop, and build software applications."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {skillGroups.map((group) => {
                const Icon = group.icon

                return (
                  <motion.div
                    key={group.title}
                    variants={cardAnimation}
                    whileHover={{
                      y: -9,
                      scale: 1.02,
                      borderColor: 'rgba(34,211,238,0.5)',
                    }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-2xl border border-white/10 bg-[#101a2b] p-7 shadow-lg shadow-black/10"
                  >
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.12 }}
                      className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-[#080d19]"
                    >
                      <Icon size={24} />
                    </motion.div>

                    <h3 className="mb-5 text-lg font-bold text-white">
                      {group.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          whileHover={{ scale: 1.06, y: -2 }}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-24 border-t border-white/5 bg-[#0b1220] px-6 py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="What I've built"
              title="Featured Projects"
              description="A selection of projects that reflect my interest in creating useful and practical software solutions."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="grid gap-7 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.number}
                  variants={cardAnimation}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    borderColor: 'rgba(34,211,238,0.5)',
                  }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#101a2b] p-7 shadow-lg shadow-black/10"
                >
                  {project.image && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-[#0b1424]">
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        loading="lazy"
                        className="aspect-[2/1] w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-4xl font-black text-cyan-400/30">
                      {project.number}
                    </span>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
                      {project.status}
                    </span>
                  </div>

                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {project.category}
                  </p>

                  <h3 className="mb-4 text-2xl font-bold text-white transition group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <p className="mb-7 flex-1 text-sm leading-7 text-slate-400">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 border-t border-white/10 pt-5">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-white/[0.04] px-2 py-1 text-xs text-slate-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-5">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-cyan-400"
                      >
                        <Code2 size={17} />
                        GitHub
                        <ExternalLink size={14} />
                      </motion.a>
                    )}

                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                      >
                        Live Demo
                        <ArrowUpRight size={17} />
                      </motion.a>
                    )}

                    {!project.demo && (
                      <span className="text-sm text-slate-500">
                        {project.github
                          ? 'Live demo coming soon'
                          : 'Currently in development'}
                      </span>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CERTIFICATES */}
        <section
          id="certificates"
          className="scroll-mt-24 border-t border-white/5 px-6 py-28 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Achievements"
              title="Certificates"
              description="Courses and certifications that support my growth as a software engineer."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {certificates.map((cert) => (
                <motion.article
                  key={cert.title}
                  variants={cardAnimation}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    borderColor: 'rgba(34,211,238,0.5)',
                  }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col rounded-2xl border border-white/10 bg-[#101a2b] p-6 shadow-lg shadow-black/10"
                >
                  {cert.image ? (
                    <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-[#0b1424]">
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate`}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 transition group-hover:bg-cyan-400 group-hover:text-[#080d19]">
                      <Award size={24} />
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white transition group-hover:text-cyan-300">
                    {cert.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-cyan-400/80">
                    {cert.issuer}
                  </p>

                  {cert.detail && (
                    <p className="mb-5 mt-3 text-sm leading-6 text-slate-400">
                      {cert.detail}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-500">{cert.date}</span>

                    {cert.link && (
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                      >
                        View Certificate
                        <ArrowUpRight size={16} />
                      </motion.a>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="scroll-mt-24 px-6 py-28 lg:px-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#102238] to-[#0d1422] px-7 py-16 text-center sm:px-14">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
              />

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 9, repeat: Infinity }}
                className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
              />

              <div className="relative">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={viewportSettings}
                  transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
                  className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400"
                >
                  <Mail size={30} />
                </motion.div>

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                  Get in touch
                </p>

                <h2 className="text-3xl font-black text-white sm:text-5xl">
                  Have a project in mind?
                </h2>

                <p className="mx-auto mt-6 max-w-xl leading-8 text-slate-400">
                  I'm always interested in discussing new ideas,
                  opportunities, collaborations, and interesting software
                  projects. Let's connect and build something meaningful.
                </p>

                <motion.a
                  href="mailto:tuyisabeparfait888@gmail.com"
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-9 inline-flex items-center gap-3 rounded-full bg-cyan-400 px-8 py-4 font-bold text-[#080d19] transition hover:bg-cyan-300"
                >
                  Send Me an Email
                  <ArrowUpRight size={19} />
                </motion.a>

                <div className="mt-12 grid gap-4 text-left sm:grid-cols-2">
                  <motion.a
                    href="tel:+250780776354"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Phone size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">Phone</span>
                      <span className="font-semibold text-white">+250 780 776 354</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://wa.me/250780776354"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><MessageCircle size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">WhatsApp</span>
                      <span className="font-semibold text-white">Chat with me</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="mailto:tuyisabeparfait888@gmail.com"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Mail size={22} /></span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate-400">Email</span>
                      <span className="break-all font-semibold text-white">tuyisabeparfait888@gmail.com</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/parfaitguta"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Code2 size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">GitHub</span>
                      <span className="font-semibold text-white">parfaitguta</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/parfaitguta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Camera size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">Instagram</span>
                      <span className="font-semibold text-white">@parfaitguta</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/parfaitguta"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Users size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">Facebook</span>
                      <span className="font-semibold text-white">parfaitguta</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://www.tiktok.com/@parfaitguta"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><TikTokIcon size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">TikTok</span>
                      <span className="font-semibold text-white">@parfaitguta</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://t.me/parfaitguta"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Send size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">Telegram</span>
                      <span className="font-semibold text-white">@parfaitguta</span>
                    </span>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/tuyisabe-parfait-b8277544b"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, borderColor: 'rgba(34,211,238,0.5)' }}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#080d19]/40 p-5 transition sm:col-span-2"
                  >
                    <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400"><Briefcase size={22} /></span>
                    <span>
                      <span className="block text-sm text-slate-400">LinkedIn</span>
                      <span className="font-semibold text-white">Tuyisabe Parfait</span>
                      <span className="block text-xs text-slate-500">View my professional profile</span>
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <motion.a
            href="#home"
            whileHover={{ scale: 1.1 }}
            className="text-xl font-black text-white"
          >
            PG<span className="text-cyan-400">.</span>
          </motion.a>

          <p className="text-sm text-slate-500">
            © {currentYear} Parfait Guta. All rights reserved.
          </p>

          <motion.a
            href="https://github.com/parfaitguta"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
          >
            <Code2 size={16} />
            GitHub Profile
            <ExternalLink size={13} />
          </motion.a>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

export default App
