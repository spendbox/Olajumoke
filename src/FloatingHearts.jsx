import { useMemo } from 'react'
import { motion } from 'framer-motion'

const GLYPHS = ['❤', '✦', '✧', '★', '❥', '✿']

// A drifting field of soft glyphs that rise and fade — pure ambience.
export default function FloatingHearts({ count = 14 }) {
  const bits = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
        glyph: GLYPHS[i % GLYPHS.length],
        hue: ['#ff7eb3', '#a78bfa', '#5ee7df', '#ffd36e'][i % 4],
      })),
    [count],
  )

  return (
    <div className="floaters" aria-hidden="true">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          style={{ left: `${b.left}%`, fontSize: b.size, color: b.hue }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-15vh',
            x: [0, b.drift, 0],
            opacity: [0, 0.7, 0.7, 0],
            rotate: [0, 25, -15, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {b.glyph}
        </motion.span>
      ))}
    </div>
  )
}
