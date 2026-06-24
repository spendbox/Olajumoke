import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Drop your own track at public/music/track.mp3 (or .m4a/.ogg). It tries to
// autoplay; if the browser blocks autoplay, the first tap anywhere starts it.
export default function MusicToggle() {
  const audioRef = useRef(null)
  const [available, setAvailable] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [coach, setCoach] = useState(false)

  // reflect real audio state + try to autoplay
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.45

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setAvailable(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('error', onError)

    // first-visit coachmark
    let seen = false
    try {
      seen = localStorage.getItem('musicCoachSeen') === '1'
    } catch {
      /* ignore */
    }
    if (!seen) setCoach(true)

    // attempt autoplay; if blocked, start on the first user gesture anywhere
    const tryPlay = () => a.play().catch(() => {})
    tryPlay()
    const onFirstGesture = () => {
      tryPlay()
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
      window.removeEventListener('touchstart', onFirstGesture)
    }
    window.addEventListener('pointerdown', onFirstGesture)
    window.addEventListener('keydown', onFirstGesture)
    window.addEventListener('touchstart', onFirstGesture)

    // never let the coachmark linger forever
    const t = setTimeout(() => dismissCoach(), 12000)

    return () => {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('error', onError)
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
      window.removeEventListener('touchstart', onFirstGesture)
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dismissCoach = () => {
    setCoach(false)
    try {
      localStorage.setItem('musicCoachSeen', '1')
    } catch {
      /* ignore */
    }
  }

  const toggle = async () => {
    dismissCoach()
    const a = audioRef.current
    if (!a) return
    try {
      if (a.paused) await a.play()
      else a.pause()
    } catch {
      setAvailable(false)
    }
  }

  if (!available) return null

  return (
    <>
      <audio ref={audioRef} loop preload="auto" autoPlay>
        <source src="/music/track.mp3" type="audio/mpeg" />
        <source src="/music/track.m4a" type="audio/mp4" />
        <source src="/music/track.ogg" type="audio/ogg" />
      </audio>

      <div className={`music-dock ${coach ? 'is-coaching' : ''}`}>
        <AnimatePresence>
          {coach && (
            <motion.div
              className="music-coach"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
            >
              <span>🎵 tap here anytime to play or pause the music</span>
              <button className="music-coach-x" onClick={dismissCoach} aria-label="Got it">
                got it
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {coach && <span className="music-pulse" aria-hidden="true" />}

        <motion.button
          className="music-btn"
          onClick={toggle}
          aria-label={playing ? 'Pause music' : 'Play music'}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={
            coach
              ? { opacity: 1, scale: [1, 1.14, 1] }
              : { opacity: 1, scale: 1 }
          }
          whileTap={{ scale: 0.9 }}
          transition={
            coach
              ? { scale: { duration: 1.1, repeat: Infinity }, opacity: { duration: 0.4 } }
              : { delay: 0.4 }
          }
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
      </div>
    </>
  )
}
