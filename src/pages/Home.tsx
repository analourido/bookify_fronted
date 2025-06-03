import { Link } from "react-router-dom";
import GlobalStatistics from "../components/StatisticsCard";

function Home() {

    return (
        <div className="bg-cover bg-center flex flex-col items-center justify-center text-center">
            {/* Título y descripción */}
            <div className="m-15 p-8 max-w-3xl ">
                <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-wide text-primary-70 md:text-6xl">
                    Bookify
                </h1>
                <p className="m-5 text-lg font-light text-primary-85 md:text-xl">
                    Lee, conecta y comparte.
                </p>
                <Link
                    to="/register"
                    className="mt-6 px-6 py-3 bg-primary-85 text-primary-50 font-semibold rounded-full shadow hover:bg-primary-90 transition"
                >
                    Regístrate aquí
                </Link>
            </div>

            {/* Imagen */}
            <div className="mt-10 relative w-full max-w-md md:max-w-lg">
                <div className="relative mx-auto">
                    <img
                        src="img/mascota_01.png"
                        className="w-full h-auto"
                        alt="Imagen de libros"
                    />
                </div>
                <div className="relative mx-auto bg-primary-50 rounded-b-xl rounded-t-sm h-[20px] max-w-md md:h-[25px]">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[60px] h-[6px] bg-primary-60"></div>
                </div>
            </div>

            {/* Estadísticas globales */}
            <div className="px-4 py-4">
                <h3 className="text-lg font-semibold text-primary-90 mb-2">
                    Estadísticas Globales
                </h3>
                <GlobalStatistics />
            </div>
        </div>

    );
}

export default Home;
