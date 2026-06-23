import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Aurora from './Aurora.jsx'
import Button from './Button.jsx'

const FULL_NAME = ['Aromashodu', 'Olajumoke', 'Faderera']

const fade = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -30, filter: 'blur(8px)' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

function burst() {
  confetti({
    particleCount: 90,
    spread: 80,
    origin: { y: 0.7 },
    colors: ['#ff7eb3', '#a78bfa', '#5ee7df', '#ffd36e'],
  })
}

/* ---------- Slide 0: Intro ---------- */
function Intro({ next }) {
  return (
    <motion.div className="panel" {...fade}>
      <div className="eyebrow">a tiny secret</div>
      <p className="lead">
        This is probably the most random, nerdy gift you would ever get…
        <br />
        and it&apos;s for your eyes only.
      </p>
      <p className="whisper">promise you won&apos;t tell anyone? 🤫</p>
      <Button onClick={next}>I promise</Button>
    </motion.div>
  )
}

/* ---------- Slide 1: Promise promise ---------- */
function PromiseAgain({ next }) {
  return (
    <motion.div className="panel" {...fade}>
      <motion.p
        className="lead"
        animate={{ rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        Promise promise????
      </motion.p>
      <p className="sub">pinky swear, no take-backs 🤞</p>
      <Button onClick={next}>I promise</Button>
    </motion.div>
  )
}

/* ---------- Slide 2: Name reveal ---------- */
function NameReveal({ next }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown < FULL_NAME.length) {
      const t = setTimeout(() => {
        if (shown === 0) burst()
        setShown((s) => s + 1)
      }, shown === 0 ? 700 : 950)
      return () => clearTimeout(t)
    }
    const done = setTimeout(next, 1900)
    return () => clearTimeout(done)
  }, [shown, next])

  return (
    <motion.div className="panel" {...fade}>
      <motion.div
        className="hi"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Hi,
      </motion.div>
      <div className="names">
        <AnimatePresence>
          {FULL_NAME.slice(0, shown).map((n) => (
            <motion.span
              key={n}
              className="name"
              initial={{ opacity: 0, y: 60, scale: 0.6, rotateX: -90 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                opacity: { duration: 0.6 },
                y: { type: 'spring', stiffness: 200, damping: 16 },
                scale: { type: 'spring', stiffness: 200, damping: 16 },
                rotateX: { duration: 0.6 },
                backgroundPosition: { duration: 8, repeat: Infinity, ease: 'linear' },
              }}
            >
              {n}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ---------- Slide 3: Choose a rating ---------- */
const RATINGS = [
  { key: 'g', code: 'G', emoji: '🌸', label: 'sweet & wholesome', note: 'aww, playing it cute 🥹' },
  { key: 'pg', code: 'PG-13', emoji: '😏', label: 'a little spicy', note: 'ooh, living dangerously 😌' },
  { key: 'x', code: '18+', emoji: '🔥', label: 'no holding back', note: 'bold choice… buckle up 😈' },
]

function Choose() {
  const [picked, setPicked] = useState(null)

  return (
    <motion.div className="panel" {...fade}>
      <div className="eyebrow">the real reason i built this</div>
      <p className="lead">
        I wanted to tell you how amazing you are… but words couldn&apos;t do it.
        <br />
        so I did the next best thing — I built you an app.
      </p>
      <p className="sub">
        First, choose how you&apos;d like me to express my thoughts about you:
      </p>

      <div className="cards">
        {RATINGS.map((r, i) => (
          <motion.button
            key={r.key}
            className={`card card-${r.key}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 160, damping: 18 }}
            whileHover={{ scale: 1.05, y: -6, borderColor: 'rgba(255,255,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setPicked(r)
              burst()
            }}
          >
            <span className="card-emoji">{r.emoji}</span>
            <span className="card-rating">{r.code}</span>
            <span className="card-label">{r.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={picked ? picked.key : 'empty'}
          className="chosen-note"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {picked ? picked.note : 'pick one to begin ✨'}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}

export default function App() {
  const [slide, setSlide] = useState(0)
  const next = () => setSlide((s) => s + 1)

  const slides = [
    <Intro key="intro" next={next} />,
    <PromiseAgain key="promise" next={next} />,
    <NameReveal key="name" next={next} />,
    <Choose key="choose" />,
  ]

  return (
    <>
      <Aurora />
      <div className="stage">
        <AnimatePresence mode="wait">{slides[slide]}</AnimatePresence>
      </div>
      <div className="footer-hint">made with way too much love · for your eyes only</div>
    </>
  )
}
