import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { reasons, toneMeta } from './content.js'

// Shuffle the nine traits (indices 0..8); keep the "10%" and fiancé beats last.
function buildOrder() {
  const traits = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = traits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[traits[i], traits[j]] = [traits[j], traits[i]]
  }
  return [...traits, 9, 10]
}

// Emoji with a glowing halo + slow rotating gradient ring + gentle float.
function GlowEmoji({ children, spin = true }) {
  return (
    <div className="emoji-wrap">
      {spin && (
        <motion.span
          className="emoji-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.span
        className="emoji-glyph"
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
        transition={{
          scale: { type: 'spring', stiffness: 220, damping: 12, delay: 0.08 },
          rotate: { type: 'spring', stiffness: 220, damping: 12, delay: 0.08 },
          y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.span>
    </div>
  )
}

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.96, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.96, filter: 'blur(6px)' }),
}

function burst() {
  confetti({
    particleCount: 70,
    spread: 75,
    origin: { y: 0.7 },
    colors: ['#ff7eb3', '#a78bfa', '#5ee7df', '#ffd36e'],
  })
}

export default function Reasons({ tone, onRestart }) {
  const order = useMemo(buildOrder, [])
  const [[i, dir], setStep] = useState([0, 1])
  const total = order.length
  const done = i >= total
  const meta = toneMeta[tone]
  const r = done ? null : reasons[order[i]]

  const go = (d) => {
    setStep(([cur]) => {
      const nextI = Math.min(Math.max(cur + d, 0), total)
      if (nextI === total && cur !== total) burst()
      return [nextI, d]
    })
  }

  return (
    <motion.div
      className="reasons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="reasons-top">
        <span className="tone-badge">{meta.code}</span>
        {!done && (
          <span className="counter">
            {String(i + 1).padStart(2, '0')} <span className="counter-dim">/ {total}</span>
          </span>
        )}
      </div>

      {!done && (
        <div className="progress">
          <motion.div
            className="progress-fill"
            animate={{ width: `${((i + 1) / total) * 100}%` }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
          />
        </div>
      )}

      <div className="reasons-stage">
        <AnimatePresence mode="wait" custom={dir}>
          {!done ? (
            <motion.div
              key={i}
              className="reason-card"
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowEmoji>{r.emoji}</GlowEmoji>
              <h2 className="reason-title">{r.title}</h2>
              <p className="reason-body">{r[tone]}</p>
            </motion.div>
          ) : (
            <motion.div
              key="end"
              className="reason-card"
              variants={variants}
              custom={1}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowEmoji spin={false}>💌</GlowEmoji>
              <h2 className="reason-title">that&apos;s the 10%.</h2>
              <p className="reason-body">
                The rest of you is even better. Glad you exist, Olajumoke. ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="reasons-nav">
        <button
          className="nav-btn nav-ghost"
          onClick={() => (i === 0 ? onRestart() : go(-1))}
        >
          {i === 0 ? '↺ start' : '← back'}
        </button>
        {!done ? (
          <button className="nav-btn nav-primary" onClick={() => go(1)}>
            {i === total - 1 ? 'finish ♥' : 'next →'}
          </button>
        ) : (
          <button className="nav-btn nav-primary" onClick={onRestart}>
            replay ↺
          </button>
        )}
      </div>
    </motion.div>
  )
}
