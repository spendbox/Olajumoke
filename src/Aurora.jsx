import { motion } from 'framer-motion'

const blobs = [
  { c: '#ff7eb3', size: 420, x: '8%', y: '12%', dur: 18 },
  { c: '#a78bfa', size: 480, x: '70%', y: '8%', dur: 22 },
  { c: '#5ee7df', size: 360, x: '55%', y: '70%', dur: 26 },
  { c: '#ffd36e', size: 300, x: '18%', y: '72%', dur: 20 },
]

export default function Aurora() {
  return (
    <>
      <div className="aurora">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className="blob"
            style={{
              background: b.c,
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 40, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="grain" />
    </>
  )
}
