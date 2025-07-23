import "./styles.css"

function LoadingIcon() {
    return (
        <div className="relative z-0">
            <div className="loading-icon m-auto"></div>
            <div className="relative pt-2 text-center">
                Loading
                <span className="ellipses absolute">
                    <div className="text-transparent">...</div>
                </span>
            </div>
        </div>
    )
}

export default LoadingIcon
