import React from "react";
import '../design/DataCard.css';
import ModelContainer from "../../models/ModelContainer";
import { useNavigate } from "react-router-dom"

const DataCard = ({ name = "Dumb", uname="dumber", children }) => {
    const navigate=useNavigate()
    const handleClick=(names)=>{
        navigate("data",{state:{name:names,user:uname}})
    }
    return (
        <div className="data-card">
            <div className="model-container">
                <ModelContainer height={'100%'} zoomable={false}>
                    {children}
                </ModelContainer>
            </div>
            <h3 className="plant-name" onClick={() => handleClick(name)}>{name}</h3>
        </div>
    )
}

export default DataCard;
