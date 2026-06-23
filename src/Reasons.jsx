import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { reasons, toneMeta } from './content.js'

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
  const [[i, dir], setStep] = useState([0, 1])
  const total = reasons.length
  const done = i >= total
  const meta = toneMeta[tone]

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
              <motion.div
                className="reason-emoji"
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.1 }}
              >
                {reasons[i].emoji}
              </motion.div>
              <h2 className="reason-title">{reasons[i].title}</h2>
              <p className="reason-body">{reasons[i][tone]}</p>
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
              <motion.div
                className="reason-emoji"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌
              </motion.div>
              <h2 className="reason-title">…and that&apos;s only the 10%.</h2>
              <p className="reason-body">
                There&apos;s so much more where that came from. Happy you exist,
                Olajumoke. ✨
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
