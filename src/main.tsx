import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./assets/styles/index.css"
import App from "./app.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
