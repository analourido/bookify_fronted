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
                    publishedAt: new Date(data.publishedAt || '').toISOString().slice(0, 16),
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
        e.preventDefault();
        if (!form.title || !form.author) {
            setErrors({ message: 'El título y el autor son obligatorios' });
            return;
        }
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
                const errorObj: Record<string, string> = error?.reduce((acc, err) => {
                    const errorDetail = err as ErrorMsgData;
                    acc[errorDetail.path] = errorDetail.msg;
                    return acc;
                }, {});
                setErrors(errorObj);
            } else if (error instanceof Error) {
                setErrors({ message: error.message || JSON.stringify(error) || 'Error desconocido' });
                console.log('Error object:', error);
            } else {
                setErrors({ message: error as string || 'Error desconocido' });
                console.log('Error object:', error);
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
        <div className='text-white flex flex-col'>
            <h2 className="text-4xl font-extrabold dark:text-white">{id ? 'Edición de libro' : 'Inserción de un nuevo libro'}</h2>

            <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>

                <InputForm text="Título" name="title" value={form.title || ''} handleChange={handleChange} error={errors.title} />
                <TextAreaInputForm type="textarea" rows={6} text="Descripción" name="description" value={form.description || ''} handleChange={handleChange} error={errors.description} />

                <InputForm text="Autor" name="author" value={form.author || ''} handleChange={handleChange} error={errors.contactEmail} />
                <InputForm text="Género" name="genre" value={form.genre || ''} handleChange={handleChange} error={errors.location} />

                <InputForm type="datetime-local" text="Fecha publicación:" name="publishedAt" value={form.publishedAt || ''} handleChange={handleChange} error={errors.publishedAt} />


                <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría:</label>
                <select id="idCategory" name='idCategory' value={form.idCategory ?? ""}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" >Seleciona categoria</option>
                    {categorias?.map(categoria =>
                        <option key={categoria.id} value={categoria.id}> {categoria.name} </option>
                    )}
                </select>


                {errors && errors.message && (
                    console.log('Error message:', errors.message),
                    <p className="text-center mt-4 text-red-500">
                        {typeof errors.message === 'string' ? errors.message : JSON.stringify(errors.message)}
                    </p>
                )}

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default BookForm