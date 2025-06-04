import GlobalStatistics from "../components/StatisticsCard";

function Home() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold text-primary">
                        Bienvenido a <span className="text-accent">Bookify</span>
                    </h1>
                    <p className="py-6 text-primary-70">
                        Descubre, recuerda y comparte tus historias favoritas con otros lectores.
                    </p>
                    <button className="btn btn-primary mb-6">
                        Regístrate aquí
                    </button>

                    {/* Carrusel */}
                    <div className="carousel rounded-box mt-6">
                        {[
                            "img/img01.jpg",
                            "img/img02.jpg",
                            "img/img03.jpg",
                            "img/img04.jpg",
                            "img/img05.jpg",
                            "img/img06.jpg",
                            "img/img07.jpg"
                        ].map((src, index) => (
                            <div className="carousel-item" key={index}>
                                <img
                                    src={src}
                                    alt={`Imagen ${index}`}
                                    className="object-cover aspect-square w-64 rounded-box"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Estadísticas globales */}
                    <div className="mt-10">
                        <GlobalStatistics />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
