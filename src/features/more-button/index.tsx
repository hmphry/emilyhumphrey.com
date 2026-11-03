function MoreButton() {
    return (
        <div className="p-2 pb-4">
            <button
                className="text-pink-key hover:text-content flex w-full cursor-pointer items-center justify-between p-2"
                title="more"
                type="button"
            >
                <span className="size-1 rounded-full bg-current"></span>
                <span className="size-1 rounded-full bg-current"></span>
                <span className="size-1 rounded-full bg-current"></span>
            </button>
        </div>
    )
}

export default MoreButton
