import { Link } from "react-router-dom";


function Home() {
    return (
        <div className=" bg-cover bg-center flex flex-col items-center justify-center text-center">
            {/*titulo y descripcion*/}
            <div className="p-8 max-w-3xl bg-[rgba(43,54,114,0.13)] rounded-2xl shadow-lg">
                <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-wide text-primary-70 md:text-6xl">
                    Bienvenido a <span className="text-primary-90">Bookify</span>
                </h1>
                <p className="m-5 text-lg font-light text-primary-85 md:text-xl">
                    Descubre, recuerda y comparte tus historias favoritas.
                </p>
                <Link
                    to="/register"
                    className="mt-6 px-6 py-3 bg-primary-85 text-primary-50 font-semibold rounded-full "
                >
                    Regístrate aquí
                </Link>
            </div>

            {/*imagen*/}
            <div className="mt-10 relative w-full max-w-md md:max-w-lg">
                <div className="relative mx-auto border-[8px] border-[rgba(43,54,114,0.13)] rounded-xl shadow-xl overflow-hidden">
                    <img
                        src="img/Diseño01.png"
                        className="w-full h-auto"
                        alt="Imagen de libros"
                    />
                </div>
                <div className="relative mx-auto bg-primary-50 rounded-b-xl rounded-t-sm h-[20px] max-w-md md:h-[25px]">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[60px] h-[6px] bg-primary-60"></div>
                </div>
            </div>
        </div>


    );

}

export default Home;
