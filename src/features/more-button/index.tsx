function Footer() {
    return (
        <div className="layout-grid fixed bottom-0 w-16">
            <div className="p-2 pb-4">
                <button
                    className="text-content-4 text-emerald-light hover:text-emerald-lightest flex w-full cursor-pointer items-center justify-between p-2"
                    title="more"
                >
                    <span className="size-1 rounded-full bg-current"></span>
                    <span className="size-1 rounded-full bg-current"></span>
                    <span className="size-1 rounded-full bg-current"></span>
                </button>
            </div>
        </div>
    )
}

export default Footer
