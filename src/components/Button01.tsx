
function Button01(children: string) {
    return (
        <button
            type="button"
            className="text-primary-50 bg-[rgba(247,229,221,0.81)]  focus:outline-none hover:bg-[rgba(242,203,180,0.9)] font-medium rounded-full text-sm px-5 py-2.5 my-5"
        >
            {children}
        </button>
    )
}

export default Button01