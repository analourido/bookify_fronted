function TermsAndConditions() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <header>
                <h1 className="text-4xl font-bold text-primary mb-4">Términos y Condiciones de Uso</h1>
                <p className="text-primary-70 leading-relaxed">
                    Bienvenido a Bookify. Al acceder y utilizar nuestra plataforma, aceptas los términos y condiciones que se detallan a continuación. Si no estás de acuerdo con alguno de ellos, te recomendamos no utilizar nuestros servicios.
                </p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-2">1. Uso adecuado de la plataforma</h2>
                <p className="text-primary-70">
                    Se espera que todos los usuarios hagan un uso responsable, respetuoso y legal de Bookify. Está estrictamente prohibido:
                </p>
                <ul className="list-disc list-inside text-primary-70 mt-2 space-y-1">
                    <li>Publicar contenido ofensivo, discriminatorio o que promueva el odio.</li>
                    <li>Compartir material que infrinja derechos de autor o propiedad intelectual.</li>
                    <li>Utilizar la plataforma con fines fraudulentos o ilícitos.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-2">2. Responsabilidad del contenido</h2>
                <p className="text-primary-70">
                    Cada usuario es responsable del contenido que publica o comparte en Bookify. La plataforma no se hace responsable por los comentarios, reseñas o publicaciones realizadas por terceros.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-2">3. Privacidad y tratamiento de datos</h2>
                <p className="text-primary-70">
                    Bookify se compromete a proteger tu privacidad. Los datos personales serán tratados conforme a la legislación vigente y nuestra Política de Privacidad.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-2">4. Modificaciones de los términos</h2>
                <p className="text-primary-70">
                    Nos reservamos el derecho de actualizar estos términos en cualquier momento. Cualquier modificación será publicada en esta página. El uso continuado de la plataforma implica la aceptación de dichas modificaciones.
                </p>
            </section>

            <footer className="pt-4 border-t border-primary-20 text-primary-60 text-sm">
                Última actualización: Junio 2025
            </footer>
        </div>
    );
}

export default TermsAndConditions;
