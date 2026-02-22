'use client'

import { useEffect, useRef, useState } from 'react'

const RING_OFFSET = 4

function getRect(el: Element) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left - RING_OFFSET,
    top: rect.top - RING_OFFSET,
    width: rect.width + RING_OFFSET * 2,
    height: rect.height + RING_OFFSET * 2,
  }
}

export function FlyingFocus() {
  const ringRef = useRef<HTMLDivElement>(null)
  const previousElRef = useRef<Element | null>(null)
  const lastInputWasKeyboardRef = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('flying-focus-active', visible)
    return () => document.body.classList.remove('flying-focus-active')
  }, [visible])

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    const applyRect = (rect: { left: number; top: number; width: number; height: number }) => {
      ring.style.left = `${rect.left}px`
      ring.style.top = `${rect.top}px`
      ring.style.width = `${rect.width}px`
      ring.style.height = `${rect.height}px`
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' || e.key.startsWith('Arrow')) {
        lastInputWasKeyboardRef.current = true
      }
    }

    const handlePointerDown = () => {
      lastInputWasKeyboardRef.current = false
    }

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as Element
      if (!target || typeof target.getBoundingClientRect !== 'function') return

      const previous = previousElRef.current
      const useFlying = lastInputWasKeyboardRef.current

      if (useFlying && previous && previous !== target && document.contains(previous)) {
        const from = getRect(previous)
        const to = getRect(target)

        ring.style.transition = 'none'
        applyRect(from)
        setVisible(true)

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ring.style.transition = 'left 0.2s ease-out, top 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out'
            applyRect(to)
          })
        })
      } else {
        ring.style.transition = 'none'
        const to = getRect(target)
        applyRect(to)
        setVisible(useFlying)
      }

      previousElRef.current = target
    }

    const handleFocusOut = () => {
      previousElRef.current = document.activeElement as Element | null
    }

    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('mousedown', handlePointerDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('focusin', handleFocusIn, true)
    document.addEventListener('focusout', handleFocusOut, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('mousedown', handlePointerDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('focusin', handleFocusIn, true)
      document.removeEventListener('focusout', handleFocusOut, true)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed z-9999 rounded-md border-2 border-brand-500 shadow-[0_0_0_2px_hsl(var(--background))] transition-[left,top,width,height]"
      style={{
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
      }}
    />
  )
}
