import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Suggestion from "../models/Suggestion"
import { useNavigate, useParams } from "react-router-dom"
import { SuggestionService } from "../services/suggestion.service"
import toast from "react-hot-toast"
import ErrorMsgData from "../utils/ErrorMsgData"
import InputForm from "../components/InputForm"
import TextAreaInputForm from "../components/TextAreaInputForm"

function SuggestionForm() {

    const [form, setForm] = useState<Partial<Suggestion>>({
        title: '',
        description: '',
    })

    const { id } = useParams()
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            setLoading(true)
            SuggestionService.getById(Number(id))
                .then(data => setForm({
                    ...data,
                })
                )
                .catch((error) => setErrors(error.message))
                .finally(() => setLoading(false))

        }
    }, [id])

    const handleSubmit = async (e: FormEvent) => {

        try {
            setLoading(true);
            setErrors({});
            e.preventDefault();
            const formData = {
                ...form,
            }
            console.log("Enviando datos del formulario:", formData);

            if (id) await SuggestionService.update(Number(id), formData)
            else await SuggestionService.create(formData)

            toast.success('Sugerencia guardado correctamente!');
            navigate('/suggestions');
        } catch (error) {
            console.error("Error al guardar la sugerencia:", error);
            toast.error('Error al guardar la sugerencia!');
            if (Array.isArray(error)) {
                const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
                    const errorDetail = err as ErrorMsgData;
                    acc[errorDetail.path] = errorDetail.msg;
                    return acc;
                }, {});
                setErrors(errorObj);
            } else if (error instanceof Error) {
                const msg = error instanceof Error ? error.message : "Error desconocido"
                setErrors({ message: msg || 'Error desconocido' });
            } else {
                setErrors({ message: error as string || 'Error desconocido' });
            }
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        //if(name==='idCategory') valueNew = Number(value) 
        setForm({ ...form, [name]: value, })
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className=" flex items-center justify-center p-4  bg-cover bg-center">
            <div className="w-full max-w-5xl bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-extrabold text-primary-90 mb-6 text-center">
                    {id ? 'Edición de sugerencia' : 'Inserción de un nueva sugerencia'}
                </h2>

                <form className="mx-auto" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <InputForm
                            text="Título"
                            name="title"
                            value={form.title || ''}
                            handleChange={handleChange}
                            error={errors?.title}
                        />
                    </div>
                    <TextAreaInputForm
                        rows={6}
                        text="Descripción"
                        name="description"
                        value={form.description || ''}
                        handleChange={handleChange}
                        error={errors?.description}
                    />

                    {errors && errors.message && (
                        <p className="text-center mt-4 text-red-500">
                            {errors.message}
                        </p>
                    )}

                    <div className="flex justify-center gap-3">
                        <button
                            type="submit"
                            className="text-white bg-primary-85 hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="text-white bg-red-85 hover:bg-red-90 focus:ring-4 focus:outline-none focus:ring-red-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default SuggestionForm