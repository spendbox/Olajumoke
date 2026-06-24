import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// Drop your own track at public/music/track.mp3 (or .m4a/.ogg) and it will
// play softly in the background. The button lets her start/mute it.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.45
    const onError = () => setAvailable(false)
    a.addEventListener('error', onError)
    return () => a.removeEventListener('error', onError)
  }, [])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    try {
      if (a.paused) {
        await a.play()
        setPlaying(true)
      } else {
        a.pause()
        setPlaying(false)
      }
    } catch {
      setAvailable(false)
    }
  }

  if (!available) return null

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/track.mp3" type="audio/mpeg" />
        <source src="/music/track.m4a" type="audio/mp4" />
        <source src="/music/track.ogg" type="audio/ogg" />
      </audio>
      <motion.button
        className="music-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 0.6 }}
      >
        {playing ? (
          <motion.span
            className="music-bars"
            aria-hidden="true"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            <i /><i /><i />
          </motion.span>
        ) : (
          <span aria-hidden="true">♪</span>
        )}
      </motion.button>
    </>
  )
}
