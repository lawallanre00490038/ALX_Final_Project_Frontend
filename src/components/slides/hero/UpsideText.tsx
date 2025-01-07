import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useTransition, animated } from '@react-spring/web'

import styles from '../css/UpsideText.module.css'

export default function UpsideText() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [items, set] = useState<string[]>([])

  const transitions = useTransition(items, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: '#8fa5b6',
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#28d79f' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: 'purple' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#28b4d7' },
  })

  const cycleItems = useCallback(() => {
    let index = 0
    const itemSequences = [
      ['Welcome'],
      ['to'],
      // ["Mo'Adunni"],
    ]

    intervalRef.current = setInterval(() => {
      set(itemSequences[index])
      index = (index + 1) % itemSequences.length // Cycle back to the first sequence
    }, 3000) // Change items every 3 seconds
  }, [])

  useEffect(() => {
    cycleItems()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [cycleItems])

  return (
    <div className="">
      <div className={styles.main}>
        {transitions(({ innerHeight, ...rest }, item) => (
          <animated.div className={styles.transitionsItem} style={rest}>
            <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}
