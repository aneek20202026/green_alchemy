import React, { useEffect, useRef, useState } from "react";
import "../design/BigData.css";
import { useLocation, useNavigate } from "react-router-dom";
import ModelContainer from "../../models/ModelContainer";
import { api, arr_Model_Mapper } from "../../CONSTANTS";
import axios from "axios";

const BigData = () => {
  const divRef = useRef(null);
  const navigate=useNavigate()
  const location = useLocation();
  const { name,user } = location.state || {}
  const [all_data,set_AllData]=useState({})
  const [audioUrl, setAudioUrl] = useState(null)
  const [showBig,setShowBig]=useState(false)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const Model = arr_Model_Mapper.find((item) => item.name === name)?.my_model;

  useEffect(()=>{
    axios.post(`${api}fetchPlant`,{name:name})
    .then(function(response){
      const data = response.data.data
      if (data.audio) {
          const audioBase64 = data.audio;
          const audioBlob = new Blob(
            [new Uint8Array(atob(audioBase64).split("").map(char => char.charCodeAt(0)))], 
            { type: 'audio/mp3' }
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
      }
      set_AllData(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
  },[])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }
  const handleBookmark = ()=>{
    axios.post(`${api}setBookmark`,{name:name,user:user})
    .then(function(response){
      console.log(response.data)
      alert(response.data.message)
    })
    .catch(error => {
      console.error('Error occured:', error)
      alert("Error occured")
    })
  }

  return (
    <div ref={divRef}
      className={showBig ? "containerssss secx":"containerssss"}
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/plant-with-dark-leaves-that-says-its-title-title_659788-7906.jpg')`,
      }}
    >
      <header className="header"> <h1>{name}</h1> </header>
      <div className="plant-main">
        <div className="asses" style={{ aspectRatio: 0.9 }}>
          <ModelContainer zoomable={false}>
            <Model scale={4} />
          </ModelContainer>
          <div className="icondsadassa">
            <img width="34" height="34" style={{marginRight:'10px',cursor:'pointer'}} 
            src="https://img.icons8.com/ios-filled/50/visible.png" alt="visible"
            onClick={()=>{
              if (divRef.current) divRef.current.scrollTo({ behavior: 'smooth',top: 0, block: 'start' })
              setShowBig(!showBig)
            }}/>
            <img width="23" height="23" style={{marginRight:'10px',cursor:'pointer'}}
            src="https://img.icons8.com/ios-filled/50/share--v1.png" alt="share--v1"/>
            <img width="24" height="24" style={{marginRight:'10px',cursor:'pointer'}} onClick={handleBookmark}
            src="https://img.icons8.com/material-rounded/24/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1"/>
            <img onClick={handlePlayPause} style={{cursor:'pointer'}}
          width="30" height="30" src="https://img.icons8.com/ios-filled/50/speaker.png" alt="speaker"/>
            {audioUrl && (<audio ref={audioRef} src={audioUrl} style={{ display: 'none' }} />)}
          </div>
        </div>
        <p className="plant-main-text">
          {all_data.description}<br/><br/>
          <b>Botanical Name: {all_data.botanical_name}</b><br/>
          <b>Type: {all_data.type}</b>
        </p>
      </div>
      <section className="main-content">
        <div className="plant-info" >
          <p className="card-text">Region</p>
          <img src={`${process.env.PUBLIC_URL}/assets/region.jpg`} alt="Plants Image" className="plants"/>
          <div className="plant-details">
            <ul className="plant-card">
              {all_data.region && all_data.region.map((item, index) => (
                <li key={index} className="plant-card-list">
                  {item.region}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="plant-info" onClick={()=>navigate("/med")}>
          <p className="card-text">Medicinal Use</p>
          <img
            src={`${process.env.PUBLIC_URL}/assets/medicinal.jpg`} alt="Plants Image" className="plants" />
          <div className="plant-details">
            <ul className="plant-card">
              {all_data.medical_usage && all_data.medical_usage.map((item, index) => (
                <li key={index} className="plant-card-list">
                  {item.use}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="plant-info" onClick={()=>navigate("/cultivate")}>
          <p className="card-text">Cultivation method</p>
          <img src={`${process.env.PUBLIC_URL}/assets/cultivation.jpg`} alt="Plants Image" className="plants" />
          <div className="plant-details">
            <ul className="plant-card">
              {all_data.cultivation_method && all_data.cultivation_method.map((item, index) => (
                <li key={index} className="plant-card-list">
                  {item.step}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="plant-info">
          <p className="card-text">Habitat</p>
          <img src={`${process.env.PUBLIC_URL}/assets/habitat.jpg`} alt="Plants Image" className="plants" />
          <div className="plant-details">
            <ul className="plant-card">
              {all_data.habitat && all_data.habitat.map((item, index) => (
                <li key={index} className="plant-card-list">
                  {item.use}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {showBig && <div className="showers">
        <ModelContainer zoomable={true} height="100%">
          <Model scale={4} />
        </ModelContainer>
        <div className="buttoner">
          <img width="34" height="34" style={{marginRight:'10px',cursor:'pointer'}} onClick={()=>setShowBig(!showBig)}
          src="https://img.icons8.com/ios-filled/50/blind.png" alt="invisible"/>
          <img onClick={handlePlayPause} style={{cursor:'pointer'}}
          width="30" height="30" src="https://img.icons8.com/ios-filled/50/speaker.png" alt="speaker"/>
        </div>
      </div>}
    </div>
  )
}

export default BigData
