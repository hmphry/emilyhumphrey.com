import { useEffect, useRef } from "react"
import { useLocation } from "react-router"

declare global {
    interface Window {
        goatcounter?: {
            count: (opts?: { path?: string }) => void
        }
    }
}

/** Counts client-side route changes; first pageview comes from count.js onload. */
export function GoatCounterTracker() {
    const location = useLocation()
    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        window.goatcounter?.count({
            path: location.pathname + location.search + location.hash,
        })
    }, [location.pathname, location.search, location.hash])

    return null
}
