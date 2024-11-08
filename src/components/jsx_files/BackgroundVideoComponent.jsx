import { useEffect, useRef, useState, startTransition } from "react";
import '../design/Video.css';
import { useLocation, useNavigate } from "react-router-dom";

const Video = () => {
    const navigate = useNavigate();
    const location=useLocation()
    const { uname } = location.state || {}
    const videoRef = useRef(null);
    const [show, setShow] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        
        const handleLoadedData = () => {
            setIsVideoLoaded(true);
            const timer = setTimeout(() => {
                setShow(true);
            }, 7000);

            return () => clearTimeout(timer);
        };

        if (videoElement) {
            videoElement.addEventListener('loadeddata', handleLoadedData);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('loadeddata', handleLoadedData);
            }
        };
    }, []);

    const handleVideoClick = () => {
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
        } else {
            videoRef.current.muted = true;
        }
    };

    return (
        <div className="main" onClick={handleVideoClick}>
            {show && <div className="Show_er">Introducing<br />
                <div style={{fontSize:'100px',marginTop:'-15px',marginLeft:'-10px'}}>Sanjeevan</div>
                <button className="Show_er2" 
                onClick={() => startTransition(() => { navigate("/home",{state:{uname:uname}}) })}>
                        Get Started
                    </button>
            </div>}
            <video preload="auto" autoPlay muted loop ref={videoRef} style={{ pointerEvents: 'none' }}>
                <source src={`${process.env.PUBLIC_URL}/assets/starting.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* {show && (
                <button className="Show_er2" onClick={() => startTransition(() => { navigate("home") })}>
                    Get Started
                </button>
            )} */}
        </div>
    );
};

export default Video;
