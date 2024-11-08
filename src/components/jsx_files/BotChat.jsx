import React, { useState } from 'react';
import '../design/BotChat.css'; 
import axios from 'axios';
import { api } from '../../CONSTANTS';

const BotChat = ({setShowBot, name}) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi there ${name} I am AyushBot. How can I help you?` },
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [imageResponse, setImageResponse] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      handleBotResponse(input);
      setInput('');
    }
  };

  const handleBotResponse = (userInput) => {
    let botMessages = [];
    axios.post(`${api}chatBot`, { text: userInput })
      .then(response => {
        if (response.data.status === 1)
          botMessages = [
            { sender: 'user', text: userInput },
            { sender: 'bot', text: response.data.message }
          ];
        else
          alert("Some error occurred");
        setMessages([...messages, ...botMessages]);
      }).catch(error => { alert(error); });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file)return;
    const formData = new FormData();
    formData.append('image', file);

    axios.post(`${api}uploadImage`, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(response => {
      if (response.data.status === 1) {
        alert(response.data.generatedText)
      } else {
        alert("Error generating text from image")
      }
    })
    .catch(error => {
      alert(error)
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3 style={{ cursor: 'pointer' }} onClick={() => setShowBot(false)}>{"<"}</h3>
        <h3>AyushBot</h3>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {/* Image Preview and Generated Text Section */}
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="uploaded" style={{ width: '100%', marginTop: '10px' }} />
            {imageResponse && (
              <div className="generated-text">
                <p>{imageResponse}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write a message..."
          onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <button onClick={handleSend}>Send</button>
      </div>

      {/* Image Upload Section */}
      <div className="image-upload">
        <input type="file" onChange={handleImageUpload} />
      </div>
    </div>
  );
};

export default BotChat;
