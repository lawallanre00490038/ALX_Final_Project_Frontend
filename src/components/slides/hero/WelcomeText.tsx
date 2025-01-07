import React, { useState, useEffect } from 'react'
import { useTrail, a } from '@react-spring/web'

import styles from '../css/WelcomeText.module.css'

export const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function WelcomeText() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(state => !state)
    }, 1000) // Toggle every 1 second

    return () => clearInterval(interval) // Clean up the interval on component unmount
  }, [])

  return (
    <div className="xl:bg-white xl:whitespace-nowrap relative z-10 xl:pr-10 max-sm::p-0 text-purple-900 ">
      <Trail open={open}>
        <span>Welcome</span>
        <span>to</span>
        {/* <span>Dolor</span>
        <span>Sit</span> */}
      </Trail>
    </div>
  )
}
