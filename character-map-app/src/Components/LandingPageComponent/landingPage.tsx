import React, {useState} from "react";
import { useNavigate  } from "react-router-dom";
import "./landingPage.css";
import { Header } from "../Header/Header";
import CharacterMapPageComponent from "../CharacterMapComponent/characterMapPage";

export function LandingPage(props:any): any {

    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate()

    function handleChange(e: any) {
        setPrompt(e.target.value);
      }

    function handleSubmit(e: any){
        if(e.key == "Enter"){
            console.log("submitted");
            //go to next component
            navigate('/map?title='+prompt);
        }
    }
    
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Header />
            <div className="landing-body">
                <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
                    <div className="title">Enter movie / show / book title - </div>
                    <input 
                        type="text"
                        placeholder="Search..."
                        value={prompt}
                        onChange={handleChange}
                        onKeyUp={handleSubmit}
                        className="input-box" 
                    />
                </div>
                {/* <div style={{color: "white", backgroundColor: "red"}}>jsbcdc {prompt}</div> */}
            </div>
        </div>
        
    );
}