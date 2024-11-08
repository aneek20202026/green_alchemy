import React, { useEffect, useState } from "react";
import "../design/Garden.css";
import DataCard from "../../components/jsx_files/DataCard";
import { api, arr_Model_Mapper } from "../../CONSTANTS";
import { ReactComponent as Iconss } from "../../assets/icon.svg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Garden = () => {
  const navigate=useNavigate()
  const location=useLocation()
  const { user } = location.state || {}
  const [isOpen, setIsOpen] = useState(false)
  const [bookmarks,setBookmarks]=useState(null)
  useEffect(()=>{
    axios.post(`${api}getBookmark`,{user:user})
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
      className="fullGarden"
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/assets/bkgImg2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        // height: '100vh', width: '100vw'
      }}
    >
      {/* <div className="nav">Virtual Garden</div> */}
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
          {/* <a href="#search"><i className="search-icon">🔍</i>Search</a> */}
          <a href="#contact-us">Contact Us</a>
          <a className="wishlist-icon" onClick={()=>setIsOpen(!isOpen)}>
            <img 
            src="https://img.icons8.com/material-rounded/24/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1"/>
          </a>
        </div>
      </div>
      <div
        className="nav"
        style={{
          // backgroundColor: "rgb(59, 59, 59)",
          marginBottom: "30px",
          justifyContent: "flex-end",
        }}
      >
        <SearchFilter />
      </div>
      <div className="body">
        {arr_Model_Mapper.map((item, index) => (
          <div className="eachItem">
            <DataCard key={index} name={item.name} uname={user}>
              <item.my_model />
            </DataCard>
          </div>
        ))}
      </div>
      
      {isOpen && <div className="apple" onClick={()=>setIsOpen(!isOpen)}></div>}

      <div>
        <div className={`slide-container ${isOpen ? 'open' : ''}`}>
        <div style={{textAlign:'center'}}>Bookmarks</div>
        <ul>
          {bookmarks ? (
            bookmarks.map((bookmark, index) => (
              <li key={index} onClick={()=>navigate("/home/garden/data",{state:{name:bookmark}})}
              >{bookmark}</li>
            ))
          ) : (
            <li>No bookmarks found</li>
          )}
        </ul>
        </div>
      </div>
    </div>
  );
};

const SearchFilter = () => {
  return (
    <div className="search_contain">
      <button className="iconsss">
        <ion-icon name="search-outline"></ion-icon> <span>Search</span>
        {/* <ion-icon name="options-outline" /> */}
      </button>
    </div>
  );
};

export default Garden;
