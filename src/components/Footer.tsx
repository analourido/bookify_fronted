function Footer() {
    return (
        <footer className="bg-base-100 border-t border-primary-60 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-primary-70">
                {/* Información */}
                <div>
                    <h4 className="text-primary font-semibold mb-2">Bookify</h4>
                    <p className="mb-1">Proyecto creado por Ana Lourido.</p>
                    <p>Vigo, Galicia · 2025</p>
                </div>

                {/* Enlaces útiles */}
                <div>
                    <h4 className="text-primary font-semibold mb-2">Enlaces</h4>
                    <ul className="space-y-1">
                        <li><a href="/clubs" className="hover:underline">Clubs</a></li>
                        <li><a href="/books" className="hover:underline">Libros</a></li>
                        <li><a href="/about" className="hover:underline">Sobre Bookify</a></li>
                        <li><a href="/terms" className="hover:underline">Términos y condiciones</a></li>
                    </ul>
                </div>

                {/* Contacto */}
                <div>
                    <h4 className="text-primary font-semibold mb-2">Contacto</h4>
                    <p className="mb-1">Email: <a href="mailto:analouridofernandez4@gmail.com" className="hover:underline">analouridofernandez4@gmail.com</a></p>
                    <p>GitHub: <a href="https://github.com/analourido" className="hover:underline" >analourido</a></p>
                </div>
            </div>

            {/* Pie inferior */}
            <div className="border-t border-primary-60 py-4 text-center text-xs text-primary-60">
                &copy; 2025 Ana Lourido. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;
