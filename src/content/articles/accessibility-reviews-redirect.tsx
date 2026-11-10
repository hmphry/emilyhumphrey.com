import { Navigate } from "react-router"

export default function AccessibilityReviewsRedirect() {
    return (
        <Navigate
            to="/articles/accessibility-review-for-ai-generated-ui"
            replace
        />
    )
}
