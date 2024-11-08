import React,{Suspense, useState} from "react"
// import { Sphere, MeshDistortMaterial , OrbitControls } from "@react-three/drei"
// import { Canvas, useLoader} from "@react-three/fiber"
// import { TextureLoader } from "three/src/loaders/TextureLoader"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import '../design/Login.css'
import { api } from "../../CONSTANTS"

const Login=()=>{
    const navigate=useNavigate()
    // const colorMap=useLoader(TextureLoader,require(`../../assets/wildlife.jpg`))
    const [name,setName]=useState('')
    const [mail,setmail]=useState('')
    const [pwd,setpwd]=useState('')
    const [conpwd,setconpwd]=useState('')
    const [issame,setissame]=useState(true)
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [loginpg,setLoginpg]=useState(true)
    
    const handleMail=(e)=>{
        setmail(e.target.value)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(mail));
    }
    const handleLogin=()=>{
        if(mail.trim()==='' || pwd.trim()===''){
            alert("All fields are mandatory")
            return
        }else if(!isValidEmail)return

        axios.post(`${api}/login`, {email:mail,password:pwd})
        .then(response => {
            if(response.data.status===1)
                navigate("intro",{state:{uname:response.data.message}})
            else
                alert(response.data.message)
        })
        .catch(error => {alert("Error occured")})
    }
    const handleSignUp=()=>{
        if(mail.trim()==='' || pwd.trim()==='' || name.trim()==='' ){
            alert("All fields are mandatory")
            return
        }else if(!isValidEmail){return}
        else if(pwd !== conpwd){setpwd('');setconpwd('');return }

        axios.post(`${api}/register`, {name:name,email:mail,password:pwd})
        .then(response => {
            if(response.data.status===1)
                navigate("intro",{state:{uname:name}})
            else
                alert(response.data.message)
        })
        .catch(error => {alert("Error occured")})
    }

    return(
        <div className="authHead" 
        style={{
            backgroundImage: `url('${process.env.PUBLIC_URL}/assets/login_bkg.jpg')`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            height: '100vh',
        }}
        >
            {/* <div className="containAuth" >
                <Canvas className="canvasAuth">
                    <OrbitControls enableZoom={false} enablePan={false} />
                    <ambientLight intensity={1} />
                    <directionalLight position={[-1,5,5]} intensity={1} />
                    <Suspense fallback={null}>
                        <Sphere visible args={[0.9,100,200]} scale={5} rotation={[1,2,4]}>
                            <MeshDistortMaterial
                                color="lightgreen" 
                                map={colorMap} 
                                attach="material" 
                                distort={0.08} 
                                speed={2} 
                                roughness={0}
                            />
                        </Sphere>
                    </Suspense>
                </Canvas>
            </div> */}
            {loginpg ?(
            <div className="authcenter" style={{backgroundImage:`url('${process.env.PUBLIC_URL}/assets/auth.jpg')`,backgroundSize:'cover'}}>
                <div className="welcum">Log In</div>
                <input type="email" className="mails" placeholder="Email id" value={mail} onChange={handleMail}/>
                {!isValidEmail && <p className="error">Please enter a valid email address</p>}
                <input className="mails" type={'password'} placeholder="Password" value={pwd} onChange={(e)=>{setpwd(e.target.value)}} />
                <div className="submitAuth" onClick={()=>handleLogin()}>Submit</div>
                <div className="signup" style={{color:'white'}}
                >Don't have an account? <div onClick={()=>{setLoginpg(false);setmail('');setpwd('');setIsValidEmail(true)}} style={{color:'blue'}}>Click Here</div></div>
            </div>
            ):(
            <div className="authcenter" style={{height:"90%",width:"50%",paddingBottom:'1%',backgroundImage:`url('${process.env.PUBLIC_URL}/assets/auth.jpg')`,backgroundSize:'cover'}}>
                <div className="welcum">Sign Up</div>
                <input type="name" className="mails" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <input type="email" className="mails" placeholder="Email id" value={mail} onChange={handleMail}/>
                {!isValidEmail && <p className="error">Please enter a valid email address</p>}
                <input type={'password'} className="mails" placeholder="Password" value={pwd} onChange={(e)=>{setpwd(e.target.value)}} />
                <input type={'password'} className="mails" placeholder="Confirm Password" value={conpwd} onChange={(e)=>{setconpwd(e.target.value)}} />
                {!issame && <p className="error">Passwords do not match</p>}
                <div className="submitAuth" onClick={()=>{setissame(pwd === conpwd);handleSignUp()}}>Submit</div>
                <div className="signup" >Already have an account? <div onClick={()=>{setLoginpg(true);setmail('');setpwd('');setIsValidEmail(true)}} style={{color:'blue'}}>Click Here</div></div>
            </div>
            )
            }
        </div>
    )
}

export default Login