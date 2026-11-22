import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import SignUpPage from './SignUpPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  )
}

export default App