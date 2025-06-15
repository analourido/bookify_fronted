// About.tsx

function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
            <section>
                <h1 className="text-4xl font-bold text-primary mb-4">Sobre Bookify</h1>
                <p className="text-primary-70 leading-relaxed">
                    Bookify es una plataforma creada para reunir a lectores de todas partes. Nuestro objetivo es fomentar el hábito de la lectura y facilitar la creación de comunidades lectoras a través de clubs, recomendaciones y herramientas de organización personal.
                </p>
                <p className="text-primary-70 mt-4">
                    Aquí puedes descubrir libros, unirte a clubs de lectura, compartir reseñas y llevar un registro de tus lecturas favoritas.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-primary mb-2">¿Tienes alguna sugerencia?</h2>
                <p className="text-primary-70 mb-4">Nos encanta escuchar ideas para mejorar la plataforma. Rellena el siguiente formulario y nos pondremos en contacto contigo si es necesario:</p>
                <form
                    action="https://formsubmit.co/analouridofernandez4@gmail.com"
                    method="POST"
                    className="space-y-4"
                >
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value="http://localhost:5173/gracias" />


                    <div>
                        <label className="block text-primary font-medium mb-1" htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-1" htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-primary font-medium mb-1" htmlFor="message">Sugerencia</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            className="textarea textarea-bordered w-full"
                            placeholder="Escribe aquí tu sugerencia..."
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>

            </section>
        </div>
    );
}

export default About;
