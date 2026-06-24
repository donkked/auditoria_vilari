import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

/**
 * Fondo de red animada (constelación de nodos conectados) dibujado en canvas.
 * Ligero, sin dependencias. Cubre su contenedor y se desvanece abajo (máscara CSS)
 * para fundirse con el resto de la página.
 */
export default function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const c = canvas.getContext('2d')
    if (!c) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const MAX_DIST = 150
    let w = 0
    let h = 0
    let raf = 0
    let nodes: Node[] = []

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas!.width = Math.round(w * DPR)
      canvas!.height = Math.round(h * DPR)
      c!.setTransform(DPR, 0, 0, DPR, 0, 0)
      const count = Math.max(24, Math.min(72, Math.floor((w * h) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }))
    }

    function render() {
      c!.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < MAX_DIST) {
            c!.strokeStyle = `rgba(34, 211, 238, ${(1 - dist / MAX_DIST) * 0.28})`
            c!.lineWidth = 1
            c!.beginPath()
            c!.moveTo(a.x, a.y)
            c!.lineTo(b.x, b.y)
            c!.stroke()
          }
        }
      }
      for (const n of nodes) {
        c!.fillStyle = 'rgba(103, 232, 249, 0.75)'
        c!.beginPath()
        c!.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
        c!.fill()
      }
    }

    function tick() {
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }
      render()
      raf = requestAnimationFrame(tick)
    }

    resize()
    if (reduce) {
      render()
    } else {
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="network-bg" aria-hidden="true" />
}
