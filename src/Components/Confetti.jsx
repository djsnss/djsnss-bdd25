// 'use client'
// import React, { useEffect, useState } from 'react'

// export default function Confetti() {
//   const [confetti, setConfetti] = useState([])

//   const CONFETTI_COLORS = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#3f3b3b', '#e53170']
//   const SHAPES = ['star', 'planet', 'comet', 'moon', 'asteroid']

//   const launchConfetti = () => {
//     const count = Math.floor(Math.random() * 50) + 150
//     const newConfetti = Array.from({ length: count }, (_, i) => ({
//       id: `confetti-${Math.random()}-${i}`,
//       x: Math.random() * 100,
//       color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
//       shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
//       size: Math.random() * 0.4 + 1,
//       tilt: Math.random() * 40 - 20,
//       speed: Math.random() * 2 + 3,
//       delay: Math.random()
//     }))

//     setConfetti(newConfetti)

//     setTimeout(() => {
//       setConfetti([])
//       launchConfetti()
//     }, 8000)
//   }

//   useEffect(() => {
//     launchConfetti()
//   }, [])

//   const renderEmoji = (shape, size) => {
//     const fontSize = `${size * 1.5}rem`
//     switch (shape) {
//       case 'star': return <div style={{ fontSize }}>⭐</div>
//       case 'planet': return <div style={{ fontSize }}>🪐</div>
//       case 'comet': return <div style={{ fontSize }}>☄️</div>
//       case 'moon': return <div style={{ fontSize }}>🌙</div>
//       case 'asteroid': return <div style={{ fontSize }}>✨</div>
//       default: return <div style={{ fontSize }}>🎉</div>
//     }
//   }

//   return (
//     <div className="fixed inset-0 pointer-events-none z-50">
//       {confetti.map(p => (
//         <div
//           key={p.id}
//           className="absolute confetti"
//           style={{
//             left: `${p.x}%`,
//             top: `-20px`,
//             width: `${p.size}rem`,
//             height: `${p.size}rem`,
//             color: p.color,
//             animationDuration: `${p.speed}s`,
//             animationDelay: `${p.delay}s`,
//             transform: `rotate(${p.tilt}deg)`
//           }}
//         >
//           {renderEmoji(p.shape, p.size)}
//         </div>
//       ))}

//       {/* Animation keyframes */}
//       <style jsx global>{`
//         @keyframes fall {
//           0% {
//             transform: translateY(-100px) rotate(0deg);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh) rotate(360deg);
//             opacity: 0;
//           }
//         }
//         .confetti {
//           animation-name: fall;
//           animation-timing-function: ease-in;
//           animation-fill-mode: forwards;
//         }
//       `}</style>
//     </div>
//   )
// }
