import { useState } from 'react'
import microphoneIcon from '../assets/microphone.png';
import searchIcon from '../assets/search.png';


function Home() {
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div
        style={{
          backgroundColor: '#0078D4',
          color: 'white',
          padding: '10px',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        NHS CareBot
      </div>

      <div
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f4f4f4',
        }}
      >
        {chat.map((message, index) => (
          <div
            key={index}
            style={{
              backgroundColor: message.sender === 'bot' ? '#E1E1E1' : '#0078D4',
              color: message.sender === 'bot' ? 'black' : 'white',
              padding: '10px',
              borderRadius: '10px',
              marginBottom: '10px',
              maxWidth: '60%',
              alignSelf: message.sender === 'bot' ? 'flex-start' : 'flex-end',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
        <div
  style={{
    borderTop: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '45px 0px',
  }}
>
  <div
    style={{
      position: 'relative',
      width: '60%',
    }}
  >
    
    <div style={{ position: 'relative', width: '100%' }}>
        <img
            src={searchIcon}
            alt="start icon"
            style={{
            position: 'absolute',
            top: '50%',
            left: '15px',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            pointerEvents: 'none',
            }}
        />

        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a question to ask..."
            style={{
            backgroundColor: 'white',
            color: 'black',
            width: '100%',
            padding: '10px 45px 10px 45px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            }}
        />

        <img
            src={microphoneIcon}
            style={{
            position: 'absolute',
            top: '30%',
            right: '-75px',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            }}
            onClick={() => {
                setText('');
            }}
        />
</div>


    
  </div>
</div>

    </div>
  )
}

export default Home