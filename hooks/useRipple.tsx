// hooks/useRipple.ts
import { useState, MouseEvent, TouchEvent, RefObject, JSX } from 'react'

interface RippleStyle {
  left: number
  top: number
  size: number
}

interface UseRippleReturn {
  rippleStyle: RippleStyle | null
  isPressed: boolean
  isFadingOut: boolean
  rippleHandlers: {
    onMouseDown: (e: MouseEvent<HTMLElement>) => void
    onMouseUp: () => void
    onMouseLeave: () => void
    onTouchStart: (e: TouchEvent<HTMLElement>) => void
    onTouchEnd: () => void
    onTouchCancel: () => void
  }
  RippleEffect: () => JSX.Element | null
}

export function useRipple(elementRef: RefObject<HTMLElement | null>): UseRippleReturn {
  const [isPressed, setIsPressed] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [rippleStyle, setRippleStyle] = useState<RippleStyle | null>(null)

  const handlePressStart = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    let clientX: number
    let clientY: number

    // Detectar si es mouse o touch
    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    // Calcular posición relativa al elemento
    const x = clientX - rect.left
    const y = clientY - rect.top

    // Calcular tamaño necesario para cubrir todo el elemento
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(rect.width - x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, rect.height - y)
    )

    setRippleStyle({ left: x, top: y, size: maxDistance * 2 })
    setIsPressed(true)
    setIsFadingOut(false)
  }

  const handlePressEnd = () => {
    setIsPressed(false)
    setIsFadingOut(true)

    // Limpiar el ripple después del fade out
    setTimeout(() => {
      setRippleStyle(null)
      setIsFadingOut(false)
    }, 300)
  }

  const rippleHandlers = {
    onMouseDown: handlePressStart,
    onMouseUp: handlePressEnd,
    onMouseLeave: handlePressEnd,
    onTouchStart: handlePressStart,
    onTouchEnd: handlePressEnd,
    onTouchCancel: handlePressEnd,
  }

  const RippleEffect = () => {
    if (!rippleStyle) return null

    return (
      <div
        className="absolute pointer-events-none"
        style={{
          left: rippleStyle.left,
          top: rippleStyle.top,
        }}
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 bg-white/10 rounded-full ${
            isFadingOut ? 'opacity-0 transition-opacity duration-300' : ''
          }`}
          style={{
            width: 0,
            height: 0,
            animation: 'ripple 150ms ease-out forwards',
            '--ripple-size': `${rippleStyle.size}px`,
          } as React.CSSProperties}
        />
      </div>
    )
  }

  return {
    rippleStyle,
    isPressed,
    isFadingOut,
    rippleHandlers,
    RippleEffect,
  }
}