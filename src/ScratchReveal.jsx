import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// Drop your (compressed) photo at public/her.jpg and it shows up here.
const IMG_SRC = '/her.jpg'

function buzz(ms = 12) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
}

export default function ScratchReveal({ next }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const finished = useRef(false)
  const [revealed, setRevealed] = useState(false)
  const [imgOk, setImgOk] = useState(true)

  // paint the scratch coating
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.round(rect.width * dpr)
    canvas.height = Math.round(rect.height * dpr)
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)
    const g = ctx.createLinearGradient(0, 0, rect.width, rect.height)
    g.addColorStop(0, '#3a1d5e')
    g.addColorStop(0.5, '#7d3aa6')
    g.addColorStop(1, '#c95a9a')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, rect.width, rect.height)
    ctx.fillStyle = 'rgba(255,255,255,0.92)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `700 ${Math.round(rect.width * 0.11)}px Syne, system-ui, sans-serif`
    ctx.fillText('scratch me', rect.width / 2, rect.height / 2 - rect.width * 0.05)
    ctx.font = `${Math.round(rect.width * 0.1)}px system-ui, sans-serif`
    ctx.fillText('✨👆✨', rect.width / 2, rect.height / 2 + rect.width * 0.1)
  }, [])

  const posOf = (e) => {
    const c = canvasRef.current
    const rect = c.getBoundingClientRect()
    const p = e.touches ? e.touches[0] : e
    return { x: p.clientX - rect.left, y: p.clientY - rect.top }
  }

  const scratchedPct = () => {
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    const data = ctx.getImageData(0, 0, c.width, c.height).data
    let cleared = 0
    let total = 0
    for (let i = 3; i < data.length; i += 4 * 50) {
      total++
      if (data[i] === 0) cleared++
    }
    return cleared / total
  }

  const finish = () => {
    if (finished.current) return
    finished.current = true
    setRevealed(true)
    buzz(30)
    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#ff7eb3', '#a78bfa', '#5ee7df', '#ffd36e'],
    })
    // wipe the rest of the coating away
    const c = canvasRef.current
    if (c) {
      c.style.transition = 'opacity 0.6s ease'
      c.style.opacity = '0'
    }
    // auto-advance after the wink lands
    setTimeout(() => next && next(), 3200)
  }

  const scratch = (e) => {
    if (!drawing.current || finished.current) return
    e.preventDefault()
    const c = canvasRef.current
    const ctx = c.getContext('2d')
    const { x, y } = posOf(e)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, Math.max(22, c.clientWidth * 0.09), 0, Math.PI * 2)
    ctx.fill()
    if (scratchedPct() > 0.55) finish()
  }

  const start = (e) => {
    drawing.current = true
    buzz(6)
    scratch(e)
  }
  const end = () => {
    drawing.current = false
  }

  return (
    <motion.div
      className="panel"
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="lead">…now scratch to see who all of this is for.</p>

      <div className="scratch-frame" ref={wrapRef}>
        {imgOk ? (
          <img
            className="scratch-img"
            src={IMG_SRC}
            alt="you"
            draggable="false"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="scratch-fallback">
            <span>add your photo at</span>
            <code>public/her.jpg</code>
          </div>
        )}

        {!finished.current && imgOk && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={start}
            onMouseMove={scratch}
            onMouseUp={end}
            onMouseLeave={end}
            onTouchStart={start}
            onTouchMove={scratch}
            onTouchEnd={end}
          />
        )}

        <AnimatePresence>
          {revealed && (
            <motion.span
              className="scratch-wink"
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: [0, 1.25, 1], rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'backOut' }}
            >
              😉
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.p
            className="whisper"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            there you are 😉
          </motion.p>
        )}
      </AnimatePresence>

      {(!imgOk || revealed) && (
        <button className="btn btn-ghost" onClick={() => next && next()}>
          continue →
        </button>
      )}
    </motion.div>
  )
}
