import { BrowserRouter } from "react-router-dom"
import Layout from "./features/layout/index.tsx"
import Navigation from "./features/navigation/index.tsx"
import Router from "./features/router/index.tsx"
import MoreButton from "./features/more-button/index.tsx"
import Footer from "./features/footer/index.tsx"

import Article from "./features/article/index.tsx"

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Layout>
                <Router />
                <Footer />
            </Layout>
            <MoreButton />
        </BrowserRouter>
    )
}

export default App
