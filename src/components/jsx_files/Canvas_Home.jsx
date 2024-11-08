import React, {Suspense} from "react"
import { Canvas, useLoader  } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import {Indoor, Garden} from "../../models/Models"

export const CanvasMaterial=()=>{
    return(
        <Canvas>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate/>
            <ambientLight intensity={1} />
            <directionalLight position={[-2,5,2]} intensity={1} />
            <Suspense fallback={null}>
                <Indoor/>
            </Suspense>
        </Canvas>
    )
}

export const CanvasMaterial2=()=>{
    return(
        <Canvas>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate/>
            <ambientLight intensity={1} />
            <directionalLight position={[-2,5,2]} intensity={1} />
            <Suspense fallback={null}>
                <Garden/>
            </Suspense>
        </Canvas>
    )
}
