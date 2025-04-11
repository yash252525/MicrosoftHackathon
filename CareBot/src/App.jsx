import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/signIn';
import Home from './pages/home';

function App() {
  const [text, setText] = useState('')
  const [chat, setChat] = useState([])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {

      const userMessage = { sender: 'user', text }
      const botResponse = { sender: 'bot', text: `You said: "${text}"` } 

      setChat([...chat, userMessage, botResponse])


      setText('')
    }
  }

  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      
  )
}

export default App