import React from "react"
import { Header, PasswordGenerator } from "../components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <div className="app-container">
            <Header />
            <PasswordGenerator/>
            <ToastContainer position="top-right" theme="light"/>
        </div>
    )
}

export default App
