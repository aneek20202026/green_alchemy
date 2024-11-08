import React from 'react';
import "../design/Business.css";
import { ReactComponent as Iconss } from "../../assets/icon.svg";

const Business = () => {
  return (
    <body className='asssssssssssss' style={{
      // background:'red'
      backgroundImage: `linear-gradient(to right bottom, rgba(7, 6, 6, 0.466), rgba(63, 60, 58, 0.39)), url('${process.env.PUBLIC_URL}/assets/3114610.jpg')`,
    }}>
      {/* <header>
        <nav className="navigation">
          <ul className="main-nav">
            <li className="main-nav-list">Sec 1</li>
          </ul>
        </nav>
      </header> */}

      <div className="navs" style={{marginBottom:'10px'}}>
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
        </div>
      </div>

      <h1 className='weewewew'>Seed Hub</h1>
      <div className="container grid margin--bottom-md">
        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/amla-seed.jpg`}
            className="plant-img"
            alt="Amla Seed"
          />
          <div className="plant-content">
            <p className="title">Amla</p>
            <p className="text">&#8377; 99 per 100 grams</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/lavender_seed.jpg`}
            className="plant-img"
            alt="Lavender Seed"
          />
          <div className="plant-content">
            <p className="title">Lavender</p>
            <p className="text">&#8377; 199 per 100 grams</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/neem seed.jpg`}
            className="plant-img"
            alt="Neem Seed"
          />
          <div className="plant-content">
            <p className="title">Neem</p>
            <p className="text">&#8377; 149 per 100 grams</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/rosemary seed.jpg`}
            className="plant-img"
            alt="Rosemary Seed"
          />
          <div className="plant-content">
            <p className="title">Rosemary</p>
            <p className="text">&#8377; 299 per 100 grams</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/tulsi seeds.jpg`}
            className="plant-img"
            alt="Tulsi Seed"
          />
          <div className="plant-content">
            <p className="title">Tulsi</p>
            <p className="text">&#8377; 99 per 100 grams</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/methi seeds.jpg`}
            className="plant-img"
            alt="Methi Seed"
          />
          <div className="plant-content">
            <p className="title">Methi</p>
            <p className="text">&#8377; 69 per 100 grams</p>
          </div>
        </div>
      </div>

      <h1 className='weewewew'>Plant Hub</h1>

      <div className="container grid margin--bottom-md">
        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.21.18.jpeg`}
            className="plant-img"
            alt="Aloe Vera"
          />
          <div className="plant-content">
            <p className="title">Aloe Vera</p>
            <p className="text">&#8377; 149 per plant</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.47.14.jpeg`}
            className="plant-img"
            alt="Rosemary"
          />
          <div className="plant-content">
            <p className="title">Rosemary</p>
            <p className="text">&#8377; 69 per plant</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.33.02.jpeg`}
            className="plant-img"
            alt="Amla"
          />
          <div className="plant-content">
            <p className="title">Amla</p>
            <p className="text">&#8377; 199 per plant</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.41.56.jpeg`}
            className="plant-img"
            alt="Jasmine"
          />
          <div className="plant-content">
            <p className="title">Jasmine</p>
            <p className="text">&#8377; 129 per plant</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.45.31.jpeg`}
            className="plant-img"
            alt="Lemon"
          />
          <div className="plant-content">
            <p className="title">Lemon</p>
            <p className="text">&#8377; 149 per plant</p>
          </div>
        </div>

        <div className="plantss">
          <img
            src={`${process.env.PUBLIC_URL}/assets/WhatsApp Image 2024-09-07 at 01.34.25.jpeg`}
            className="plant-img"
            alt="Basil"
          />
          <div className="plant-content">
            <p className="title">Basil</p>
            <p className="text">&#8377; 179 per plant</p>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Business;
