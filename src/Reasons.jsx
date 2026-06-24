import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { reasons, toneMeta, TONE_ORDER } from './content.js'

// Shuffle the nine traits (indices 0..8); keep the "10%" and fiancé beats last.
function buildOrder() {
  const traits = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = traits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[traits[i], traits[j]] = [traits[j], traits[i]]
  }
  return [...traits, 9, 10]
}

function buzz(ms = 12) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
}

function burst(opts = {}) {
  confetti({
    particleCount: 70,
    spread: 75,
    origin: { y: 0.7 },
    colors: ['#ff7eb3', '#a78bfa', '#5ee7df', '#ffd36e'],
    ...opts,
  })
}

// Glowing emoji that also reacts to taps with a little confetti pop.
function GlowEmoji({ children, spin = true }) {
  const onTap = (e) => {
    buzz(10)
    const rect = e.currentTarget.getBoundingClientRect()
    burst({
      particleCount: 36,
      spread: 360,
      startVelocity: 22,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    })
  }
  return (
    <div className="emoji-wrap">
      {spin && (
        <motion.span
          className="emoji-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      )}
      <motion.button
        className="emoji-glyph"
        type="button"
        aria-label="tap me"
        onClick={onTap}
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: 1, rotate: 0, y: [0, -8, 0] }}
        whileTap={{ scale: 1.25 }}
        transition={{
          scale: { type: 'spring', stiffness: 220, damping: 12, delay: 0.08 },
          rotate: { type: 'spring', stiffness: 220, damping: 12, delay: 0.08 },
          y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {children}
      </motion.button>
    </div>
  )
}

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 90 : -90, scale: 0.96, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -90 : 90, scale: 0.96, filter: 'blur(6px)' }),
}

export default function Reasons({ tone: initialTone, onRestart }) {
  const order = useMemo(buildOrder, [])
  const [[i, dir], setStep] = useState([0, 1])
  const [tone, setTone] = useState(initialTone)
  const total = order.length
  const done = i >= total
  const meta = toneMeta[tone]
  const r = done ? null : reasons[order[i]]

  const go = (d) => {
    setStep(([cur]) => {
      const nextI = Math.min(Math.max(cur + d, 0), total)
      if (nextI === cur) return [cur, d]
      buzz(12)
      if (nextI === total && cur !== total) burst()
      return [nextI, d]
    })
  }

  // swipe: drag horizontally to move between pages
  const onDragEnd = (_e, info) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  const onSlider = (e) => {
    const next = TONE_ORDER[Number(e.target.value)]
    if (next !== tone) {
      setTone(next)
      buzz(8)
    }
  }

  return (
    <motion.div
      className="reasons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="reasons-top">
        <span className={`tone-badge tone-${tone}`}>{meta.code}</span>
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
              drag="x"
              dragSnapToOrigin
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowEmoji>{r.emoji}</GlowEmoji>
              <h2 className="reason-title">{r.title}</h2>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tone}
                  className="reason-body"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  {r[tone]}
                </motion.p>
              </AnimatePresence>
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

      {!done && (
        <div className="spice">
          <div className="spice-labels">
            <span className={tone === 'g' ? 'on' : ''}>G</span>
            <span className={tone === 'pg' ? 'on' : ''}>PG-13</span>
            <span className={tone === 'x' ? 'on' : ''}>18+</span>
          </div>
          <input
            className={`spice-range spice-${tone}`}
            type="range"
            min="0"
            max="2"
            step="1"
            value={TONE_ORDER.indexOf(tone)}
            onChange={onSlider}
            aria-label="spice level"
          />
          <div className="spice-hint">slide to change the spice 🌶️ · swipe the card to flip</div>
        </div>
      )}

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
