import React, { Suspense, useEffect, useState } from "react";
import { CanvasMaterial, CanvasMaterial2 } from "../../components/jsx_files/Canvas_Home";
import "../design/Home.css";
import { useNavigate , useLocation } from "react-router-dom";
import { ReactComponent as Iconss } from "../../assets/icon.svg";
import { api, virtual_garden, virtual_tour } from "../../CONSTANTS";
import axios from "axios";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ChatBot } from "../../models/Models";
import BotChat from "../../components/jsx_files/BotChat";

const Home = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const { uname } = location.state || {}
  const [isOpen, setIsOpen] = useState(false)
  const [showBot,setShowBot]=useState(false)
  const [bookmarks,setBookmarks]=useState(null)
  useEffect(()=>{
    axios.post(`${api}getBookmark`,{user:uname})
    .then(function(response){
      console.log(response.data)
      setBookmarks(response.data.message)
    })
    .catch(error => {
      console.error('Error occured:', error)
      alert("Error occured")
    })
  },[])
  return (
    <div
      className="fullscreen"
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bkgImg2.jpg'`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // height: '100vh', width: '100vw'
      }}
    >
      <div className="navs">
        <div className="logo">
          <Iconss height={"50px"} width={"50px"} /> {/* Adjusted icon size to match */}
          <span className="brand-name">Sanjeevan</span>
        </div>
        <div className="nav-items">
          <a href="#home">Home</a>
          <a href="#about-us">About Us</a>
          <a href="#explore">Explore</a>
          <a href="#faqs">FAQs</a>
          <a href="#search"><i className="search-icon">🔍</i>Search</a>
          <a href="#contact-us">Contact Us</a>
          <a className="wishlist-icon" onClick={()=>setIsOpen(!isOpen)}>
            <img 
            src="https://img.icons8.com/material-rounded/24/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1"/>
          </a>
        </div>
      </div>
      <div className="section">
        <div className="desc">
          <div className="text">
            <div className="secHead"> {virtual_garden.title}</div>
            <div className="Hello">{virtual_garden.desc}</div>
            <button onClick={() => navigate("garden",{state:{user:uname}})}>Explore</button>
          </div>
          <div className="sect">
            <CanvasMaterial />
          </div>
        </div>
        </div>
        <div className="section">
        <div className="desc">
          <div className="sect">
            <CanvasMaterial2 />
          </div>
          <div className="text">
            <div className="secHead">{virtual_tour.title}</div>
            <div className="Hello">{virtual_tour.desc}</div>
            <button onClick={
              // () => navigate("tour")
              () => navigate("AR")
            }>Explore</button>
          </div>
        </div>
      </div>

      <div className="section">
        <p className="secHead" >{"Our best picks for you"}</p>
        <div className="plant-infoss">
          <div className="plant-details">
            <ul className="plant-cardgod">
              <li>
                <p className="card-text">Neem Seed</p>
                <img style={{height:'100px',width:'100px'}}
                  src={`${process.env.PUBLIC_URL}/assets/neem seed.jpg`}
                  alt="Plants Image"
                  className="plants"
                />
              </li>
              <li>
                <p className="card-text">Amla Seed</p>
                <img style={{height:'100px',width:'100px'}}
                  src={`${process.env.PUBLIC_URL}/assets/amla-seed.jpg`}
                  alt="Plants Image"
                  className="plants"
                />
              </li>
              <li>
                <p className="card-text">Lavender Seed</p>
                <img style={{height:'100px',width:'100px'}}
                  src={`${process.env.PUBLIC_URL}/assets/lavender_seed.jpg`}
                  alt="Plants Image"
                  className="plants"
                />
              </li>
              <li>
                <p className="card-text">Rosemary Seed</p>
                <img style={{height:'100px',width:'100px'}}
                  src={`${process.env.PUBLIC_URL}/assets/rosemary seed.jpg`}
                  alt="Plants Image"
                  className="plants"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="section text">
        <button onClick={() => navigate("business")}>Explore</button>
      </div>

      {isOpen && <div className="apple" onClick={()=>setIsOpen(!isOpen)}></div>}

      <div>
        <div className={`slide-container ${isOpen ? 'open' : ''}`}>
          <div style={{textAlign:'center'}}>Bookmarks</div>
        <ul>
          {bookmarks ? (
            bookmarks.map((bookmark, index) => (
              <li key={index} onClick={()=>navigate("/home/garden/data",{state:{name:bookmark,user:uname}})}
              >{bookmark}</li>
            ))
          ) : (
            <li>No bookmarks found</li>
          )}
        </ul>
        </div>
      </div>

      <div className="botter" onClick={()=>setShowBot(true)}>
        <Canvas >
            <OrbitControls enableZoom={false} enablePan={false} autoRotate/>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0,10,20]} intensity={1} />
            <Suspense fallback={null}>
                <ChatBot />
            </Suspense>
        </Canvas>
      </div>
      {showBot && <BotChat setShowBot={setShowBot} name={uname}/>}
    </div>
  );
};

export default Home;
