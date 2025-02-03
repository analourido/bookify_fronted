import React from 'react'

function Home() {
    return (
        <>
            <div className='m-5 p-5'>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-primary-50 md:text-5xl lg:text-6xl dark:text-primary-50">Bienvenido a Bookify</h1>
                <p className="text-lg font-normal text-primary-65 lg:text-xl dark:text-primary-65"> Descubre, recuerda y comparte tus historias favoritas.</p>
                <button
                    type="button"
                    className="text-primary-50 bg-[rgba(247,229,221,0.81)]  focus:outline-none hover:bg-[rgba(242,203,180,0.9)] font-medium rounded-full text-sm px-5 py-2.5 my-5"
                >
                    Register here
                </button>

            </div>

            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                    <img src="img\Diseño01.png" className="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg" alt="" />
                    <img src="img\Diseño01.png" className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt="" />
                </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>

        </>
    )
}

export default Home