import { Link } from "react-router-dom";

function ThanksPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center ">
                <h1 className="text-3xl font-bold text-primary mb-4">¡Gracias por tu sugerencia!</h1>
                <p className="text-primary-70 mb-6">
                    Valoramos mucho tu opinión. Nos ayudará a seguir mejorando Bookify.
                </p>
                <Link to="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
        </div>
    );
}

export default ThanksPage;
