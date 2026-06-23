import { motion } from 'framer-motion'

export default function Button({ children, onClick, ghost = false }) {
  return (
    <motion.button
      className={ghost ? 'btn btn-ghost' : 'btn'}
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={
        ghost
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: 0,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={{
        opacity: { duration: 0.5 },
        y: { duration: 0.5 },
        backgroundPosition: { duration: 6, repeat: Infinity, ease: 'linear' },
      }}
      whileHover={{ scale: 1.06, boxShadow: '0 14px 50px rgba(255,126,179,0.55)' }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
