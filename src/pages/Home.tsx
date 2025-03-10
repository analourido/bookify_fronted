import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
    const [activeTab, setActiveTab] = useState("about");

    return (
        <div className="bg-cover bg-center flex flex-col items-center justify-center text-center">
            {/* Título y descripción */}
            <div className="m-15 p-8 max-w-3xl bg-[rgba(43,54,114,0.13)] rounded-2xl shadow-lg">
                <h1 className="mb-4 text-5xl font-extrabold leading-tight tracking-wide text-primary-70 md:text-6xl">
                    Bienvenido a <span className="text-primary-90">Bookify</span>
                </h1>
                <p className="m-5 text-lg font-light text-primary-85 md:text-xl">
                    Descubre, recuerda y comparte tus historias favoritas.
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
                <div className="relative mx-auto border-[8px] border-[rgba(43,54,114,0.13)] rounded-xl shadow-xl overflow-hidden">
                    <img
                        src="img/Diseño03.png"
                        className="w-full h-auto"
                        alt="Imagen de libros"
                    />
                </div>
                <div className="relative mx-auto bg-primary-50 rounded-b-xl rounded-t-sm h-[20px] max-w-md md:h-[25px]">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[60px] h-[6px] bg-primary-60"></div>
                </div>
            </div>

            {/* Tabs */}
            <div className="w-full max-w-4xl mt-12 bg-primary-50 border border-primary-70 rounded-lg shadow-md">
                <ul className="flex text-sm font-medium text-center text-primary-85 border-b border-primary-70 rounded-t-lg bg-primary-50">
                    {["about", "features", "statistics"].map((tab) => (
                        <li key={tab} className="flex-1">
                            <button
                                onClick={() => setActiveTab(tab)}
                                className={`w-full py-4 ${activeTab === tab
                                    ? "text-primary-90 border-b-4 border-primary-85 bg-primary-60"
                                    : "hover:bg-primary-60 hover:text-primary-90"
                                    } transition`}
                            >
                                {tab === "about"
                                    ? "Sobre Nosotros"
                                    : tab === "features"
                                        ? "Características"
                                        : "Estadísticas"}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                <div className="p-6 m-6">
                    {activeTab === "about" && (
                        <div>
                            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-primary-90">
                                Gracias por visitar Bookify!
                            </h2>
                            <p className="mb-3 text-primary-85">
                                Bookify es tu solución integral para descubrir y gestionar libros.
                                Tanto si eres un lector apasionado o un lector casual,
                                ofrecemos herramientas para hacer que tu experiencia de lectura sea
                                sencilla e intuitiva.
                            </p>
                        </div>
                    )}
                    {activeTab === "features" && (
                        <div>
                            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-primary-90">
                                ¿Por qué elegir Bookify?
                            </h2>
                            <ul className="space-y-4 text-primary-85">
                                {[
                                    "Seguimiento integral de libros",
                                    "Recomendaciones personalizadas",
                                    "Experiencia de usuario fluida",
                                ].map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <svg
                                            className="w-4 h-4 text-primary-90 shrink-0"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === "statistics" && (
                        <div>
                            <dl className="grid grid-cols-1 gap-6 text-primary-85 md:grid-cols-3">
                                {[
                                    { label: "Libros catalogados", value: "10k+" },
                                    { label: "Usuarios activos", value: "5k+" },
                                    { label: "Páginas leídas", value: "1M+" },
                                ].map((stat, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <dt className="mb-2 text-4xl font-extrabold text-primary-90">
                                            {stat.value}
                                        </dt>
                                        <dd className="text-primary-85">{stat.label}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
