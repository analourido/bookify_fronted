import GlobalStatistics from "../components/StatisticsCard";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="bg-base-200 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto space-y-16">
                {/* Hero principal */}
                <section className="bg-base-100 shadow-xl rounded-2xl p-10 text-center">
                    <h1 className="text-6xl font-extrabold text-primary mb-4 tracking-tight leading-tight">
                        Bienvenido a <span className="text-accent">Bookify</span>
                    </h1>
                    <p className="text-lg text-primary-70 mb-6 max-w-2xl mx-auto">
                        Únete a una comunidad de lectores, descubre nuevos títulos y comparte tus opiniones con otros apasionados por la lectura.
                    </p>
                    <Link to="/register">
                        <button className="btn btn-accent text-white text-lg px-10 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform">
                            Regístrate gratis
                        </button>
                    </Link>
                </section>

                {/* Carrusel de imágenes inspiradoras */}
                <section className="bg-base-100 shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-primary mb-6 text-center">
                        Explora historias, crea comunidad
                    </h2>
                    <div className="carousel rounded-box flex gap-4 overflow-x-auto py-4">
                        {[
                            "img/img01.jpg",
                            "img/img02.jpg",
                            "img/img03.jpg",
                            "img/img04.jpg",
                            "img/img05.jpg",
                            "img/img06.jpg",
                            "img/img07.jpg"
                        ].map((src, index) => (
                            <div className="carousel-item relative group w-64 flex-shrink-0" key={index}>
                                <img
                                    src={`/${src}`}
                                    alt={`Imagen ${index}`}
                                    className="object-cover aspect-square w-full h-64 rounded-xl transition duration-300 group-hover:scale-105 shadow-md"
                                />
                            </div>
                        ))}
                    </div>
                </section>


                {/* Sección de funcionalidades */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-base-100 rounded-xl shadow-lg p-6 text-center">
                        <h3 className="text-xl font-bold text-primary mb-2">Crea tu club</h3>
                        <p className="text-primary-70 text-sm">
                            Comparte lecturas en grupo y descubre nuevas voces.
                        </p>
                    </div>
                    <div className="bg-base-100 rounded-xl shadow-lg p-6 text-center">
                        <h3 className="text-xl font-bold text-primary mb-2">Organiza tus libros</h3>
                        <p className="text-primary-70 text-sm">
                            Guarda, clasifica y sigue tu progreso lector.
                        </p>
                    </div>
                    <div className="bg-base-100 rounded-xl shadow-lg p-6 text-center">
                        <h3 className="text-xl font-bold text-primary mb-2">Comparte opiniones</h3>
                        <p className="text-primary-70 text-sm">
                            Escribe reseñas y conoce otras perspectivas.
                        </p>
                    </div>
                </section>


                {/* Estadísticas globales */}
                <section className="bg-base-100 shadow-xl rounded-2xl p-8 border border-primary-60 text-center">
                    <h2 className="text-3xl font-semibold text-primary mb-6">Estadísticas globales</h2>
                    <GlobalStatistics />
                </section>
            </div>
        </div>
    );
}

export default Home;
