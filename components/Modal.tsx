// components/ui/Modal.tsx
'use client'

import { useEffect, useLayoutEffect, useRef, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/helper/helper'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  title?: string
  subtitle?: string
  showCloseButton?: boolean
  className?: string
  variant?: 'white' | 'cream'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
}

const variantClasses = {
  white: 'bg-white',
  cream: 'bg-cream',
}

export default function Modal({
  isOpen,
  onClose,
  children,
  size = 'lg',
  title,
  subtitle,
  showCloseButton = true,
  className,
  variant = 'white',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        setShouldRender(true)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [isOpen])

  // Handle entry animation
  useLayoutEffect(() => {
    if (isOpen && shouldRender) {
      const rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
      return () => cancelAnimationFrame(rafId)
    }
  }, [isOpen, shouldRender])

  // Handle exit animation
  useEffect(() => {
    if (!isOpen && shouldRender) {
      const raf = requestAnimationFrame(() => {
        setIsAnimating(false)
      })
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
      }
    }
  }, [isOpen, shouldRender])

  // Handle Escape key and prevent background scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    // Evita el scroll por rueda/touch/teclas cuando el objetivo NO está dentro del modal
    const preventScroll = (e: Event) => {
      const target = e.target as Node | null
      if (modalRef.current && target && modalRef.current.contains(target)) return
      e.preventDefault()
    }

    const preventScrollKeys = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return

      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
      if (keys.includes(e.key)) {
        if (modalRef.current && document.activeElement && modalRef.current.contains(document.activeElement)) return
        e.preventDefault()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      previousActiveElement.current = document.activeElement as HTMLElement

      window.addEventListener('wheel', preventScroll as EventListener, { passive: false })
      window.addEventListener('touchmove', preventScroll as EventListener, { passive: false })
      window.addEventListener('keydown', preventScrollKeys as EventListener)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('wheel', preventScroll as EventListener)
      window.removeEventListener('touchmove', preventScroll as EventListener)
      window.removeEventListener('keydown', preventScrollKeys as EventListener)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen && previousActiveElement.current) {
      previousActiveElement.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const modal = modalRef.current
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    modal.addEventListener('keydown', handleTab)

    const focusTimer = setTimeout(() => {
      firstElement?.focus()
    }, 50)

    return () => {
      modal.removeEventListener('keydown', handleTab)
      clearTimeout(focusTimer)
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!shouldRender) return null

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6',
        'transition-opacity duration-300',
        isAnimating ? 'opacity-100' : 'opacity-0'
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay/Backdrop */}
      <div
        className={cn(
          'hidden md:block fixed inset-0 bg-black/40',
          'transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={cn(
          // Base styles
          'relative w-full',
          variantClasses[variant],

          // Mobile: Pantalla completa con animación desde abajo
          'h-full',
          'transition-transform duration-300 ease-out',
          isAnimating
            ? 'translate-y-0'
            : 'translate-y-full md:translate-y-0',

          // Desktop: Contenedor con límites y animación de escala
          'md:h-auto md:min-h-50 md:max-h-[80vh] md:rounded-2xl md:shadow-2xl',
          'md:transition-all md:duration-300',
          isAnimating
            ? 'md:scale-100 md:opacity-100'
            : 'md:scale-95 md:opacity-0',

          // Tamaño según prop
          sizeClasses[size],

          // Overflow
          'overflow-hidden',

          // Flex para layout interno
          'flex flex-col',

          className ? className : ''
        )}
      >
        {/* Header */}
        {(title || subtitle || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5 shrink-0">
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className={cn(
                    "text-2xl font-bold",
                    variant === "cream" ? "text-dark" : "text-white"
                  )}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={cn(
                  "text-sm",
                  variant === "cream" ? "text-gray-500" : "text-gray-400"
                )}>
                  {subtitle}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="text-gray-900" size={18} />
              </button>
            )}
          </div>
        )}

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}