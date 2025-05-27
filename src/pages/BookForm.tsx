import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Book from '../models/Books'
import { BookService } from '../services/book.services'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CategoryService } from '../services/category.service'
import Category from '../models/Category'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'

// - formulario de creación de 1 oferta
// -- Actualizar una oferta


function BookForm() {

    //const threeMonthLater = new Date( new Date().setMonth(new Date().getMonth() + 3) )
    //                    .toISOString().slice(0,16)
    const [form, setForm] = useState<Partial<Book>>({
        title: '',
        author: '',
        genre: '',
        description: '',
        coverUrl: '',
        publishedAt: new Date().toISOString().slice(0, 16),
        idCategory: undefined
        // falta reviews
    })
    const [categorias, setCategorias] = useState<Category[]>()

    const { id } = useParams()
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {

            setLoading(true)
            BookService.getById(Number(id))
                .then(data => setForm({
                    ...data,
                    publishedAt: new Date(data.publishedAt || '').toISOString().slice(0, 16)
                })
                )
                .catch((error) => setErrors(error.message))
                .finally(() => setLoading(false))

        }
    }, [id])

    useEffect(() => {
        CategoryService.getAll()
            .then(setCategorias)
            .catch(error => setErrors(error.message))
    }, [])

    const handleSubmit = async (e: FormEvent) => {

        try {
            setLoading(true);
            setErrors({});
            e.preventDefault();
            const formData = {
                ...form,
                idCategory: form.idCategory ? Number(form.idCategory) : null,
                publishedAt: new Date(form.publishedAt || '').toISOString()
            }
            console.log("Enviando datos del formulario:", formData);

            if (id) await BookService.update(Number(id), formData)
            else await BookService.create(formData)

            toast.success('Libro guardado correctamente!');
            navigate('/books');
        } catch (error) {
            console.error("Error al guardar el libro:", error);
            toast.error('Error al guardar el libro!');
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

    //const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    //    const { checked, name } = e.target
    //    setForm({ ...form, [name]: checked, })
    //}

    if (loading) return <p>Loading...</p>


    return (
        <div className=" flex items-center justify-center p-4  bg-cover bg-center">
            <div className="w-full max-w-5xl bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-extrabold text-primary-90 mb-6 text-center">
                    {id ? 'Edición de libro' : 'Inserción de un nuevo libro'}
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
                        <InputForm
                            text="Autor"
                            name="author"
                            value={form.author || ''}
                            handleChange={handleChange}
                            error={errors?.author}
                        />
                        <InputForm
                            text="Género"
                            name="genre"
                            value={form.genre || ''}
                            handleChange={handleChange}
                            error={errors?.genre}
                        />
                        <InputForm
                            text="URL de la portada"
                            name="coverUrl"
                            value={form.coverUrl || ''}
                            handleChange={handleChange}
                            error={errors?.coverUrl}
                        />
                        {form.coverUrl && (
                            <div className="mt-4 text-center">
                                <img
                                    src={form.coverUrl}
                                    alt="Vista previa de la portada"
                                    className="h-40 mx-auto rounded shadow"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div></div>
                        <InputForm
                            type="datetime-local"
                            text="Fecha publicación:"
                            name="publishedAt"
                            value={form.publishedAt || ''}
                            handleChange={handleChange}
                            error={errors?.publishedAt}
                        />
                        <div></div>
                    </div>

                    <TextAreaInputForm
                        rows={6}
                        text="Descripción"
                        name="description"
                        value={form.description || ''}
                        handleChange={handleChange}
                        error={errors?.description}
                    />

                    <div className="mb-5">
                        <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-primary-70">
                            Categoría:
                        </label>
                        <select
                            id="idCategory"
                            name="idCategory"
                            value={form.idCategory ?? ""}
                            onChange={handleChange}
                            className="bg-[rgba(43,54,114,0.13)] border border-primary-65 text-primary-85 text-sm rounded-lg focus:ring-primary-85 focus:border-primary-85 block w-full p-2.5 transition-all duration-300 ease-in-out"
                        >
                            <option value="">Selecciona categoria</option>
                            {categorias?.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.name}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            onClick={() => navigate("/books")}
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
export default BookForm;