import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { useState } from 'react'
import { Aloevera, Neem, GardenAR, Lavender, Sky } from '../../models/Models'

const store = createXRStore()
const audio = new Audio('/assets/garden.mp3')

const handleBoxClick = () => {
  if (audio.paused) {
    audio.play()
  } else {
    audio.pause()
  }
}

function ARScene() {
  const [inAR,setInar]=useState(false)
  const models = [
    { model: Lavender, props: { scale: 0.4, onClick: handleBoxClick, position: [0, 0.8, 0] } },
    { model: Aloevera, props: { scale: 0.4, onClick: handleBoxClick, position: [-2, 0.8, 0] } },
    { model: Neem, props: { scale: 0.8, onClick: handleBoxClick, position: [5, 2.4, 0] } },
  ]

  return (
    <>
      {!inAR && <button onClick={() => {store.enterAR();setInar(true)}} 
      style={{position:'absolute',left:0,top:'20%',zIndex:2}}>Enter AR</button>}
      
      <Canvas>
        <XR store={store}>
          <directionalLight intensity={3.5} position={[-1,1,1]}/>
          <Sky />
          <GardenAR />
          {models.map(({ model: Model, props }, index) => (
            <mesh key={index} {...props}>
              <Model />
            </mesh>
          ))}
        </XR>
      </Canvas>
    </>
  )
}

export default ARScene
