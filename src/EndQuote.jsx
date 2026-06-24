import { motion } from 'framer-motion'

export default function EndQuote({ onRestart }) {
  return (
    <motion.div
      className="panel"
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="end-quote"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        dyes may turn clothes dark, but you light up everywhere you go.
      </motion.p>

      <motion.p
        className="end-cheesy"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        ……that was terribly cheesy 😂
      </motion.p>

      <motion.button
        className="btn btn-ghost"
        onClick={onRestart}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 0.6 }}
      >
        ↺ from the top
      </motion.button>
    </motion.div>
  )
}
