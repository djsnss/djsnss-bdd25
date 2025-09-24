// import React from 'react'
// import { BloodDonationLeaderboard } from './Components/BloodDonationLeaderboard'
// import './Styles/App.css'
// function App() {
//   return (
//     <div className="app-container">
//       <div className="leaderboard-wrapper">
//         <BloodDonationLeaderboard />  
//       </div>
//     </div>
//   )
// }

// export default App

import React from 'react'
import { BloodDonationLeaderboard } from './Components/BloodDonationLeaderboard'
import './Styles/App.css'
import Confetti from './Components/confetti'

function App() {
  return (
    <div className="app-container">
      <div className="leaderboard-wrapper relative min-h-screen">
        <BloodDonationLeaderboard />
        <Confetti />
      </div>
    </div>
  )
}

export default App
