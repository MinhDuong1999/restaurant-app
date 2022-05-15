// Import  từ thư viện 
import React  from "react";
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";

// Import từ server app
import App from"./App"
import { StateProvider } from "./Context/StateProvider";
import "./index.css"
import { initialState } from "./Context/initialState";
import reducer from "./Context/reducer";



const container = document.getElementById("root")

const root  = createRoot(container)
root.render(
   
        <Router>
            <StateProvider initialState = {initialState } reducer = {reducer}>
                <App/>
            </StateProvider>
        </Router>
   
)