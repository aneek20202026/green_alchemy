import React , { Suspense } from "react"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

const ModelContainer = ({ zoomable = true, height='80%', children }) =>{
    return(
        <Canvas style={{height:height}}>
            <OrbitControls enableZoom={zoomable} enablePan={false} autoRotate  scale={2}/>
            <ambientLight intensity={1.5} />
            <directionalLight position={[0,10,20]} intensity={1} />
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </Canvas>
    )
}

export default ModelContainer