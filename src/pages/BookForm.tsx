import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Book from '../models/Books';
import Category from '../models/Category';
import { BookService } from '../services/book.services';
import { CategoryService } from '../services/category.service';
import InputForm from '../components/InputForm';
import TextAreaInputForm from '../components/TextAreaInputForm';
import ErrorMsgData from '../utils/ErrorMsgData';
import toast from 'react-hot-toast';

function BookForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<Partial<Book>>({
        title: '',
        author: '',
        genre: '',
        description: '',
        coverUrl: '',
        publishedAt: new Date().toISOString().slice(0, 16),
        idCategory: undefined
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            BookService.getById(Number(id))
                .then(data => {
                    setForm({
                        ...data,
                        publishedAt: new Date(data.publishedAt || '').toISOString().slice(0, 16)
                    });
                })
                .catch(error => setErrors({ message: error.message }))
                .finally(() => setLoading(false));
        }
    }, [id]);

    useEffect(() => {
        CategoryService.getAll()
            .then(setCategories)
            .catch(error => setErrors({ message: error.message }));
    }, []);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const formData = {
                ...form,
                idCategory: form.idCategory ? Number(form.idCategory) : null,
                publishedAt: new Date(form.publishedAt || '').toISOString()
            };
            if (id) {
                await BookService.update(Number(id), formData);
                toast.success('¡Libro actualizado con éxito!');
            } else {
                await BookService.create(formData);
                toast.success('¡Libro creado con éxito!');
            }
            navigate('/books');
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar el libro.');
            if (Array.isArray(error)) {
                const errorObj = error.reduce((acc: Record<string, string>, err: unknown) => {
                    const detail = err as ErrorMsgData;
                    acc[detail.path] = detail.msg;
                    return acc;
                }, {});
                setErrors(errorObj);
            } else if (error instanceof Error) {
                setErrors({ message: error.message });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="text-center mt-8 text-primary">Cargando...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg border border-primary-60 mt-8">
            <h2 className="text-3xl font-extrabold text-primary-90 mb-6 text-center">
                {id ? 'Editar Libro' : 'Crear Nuevo Libro'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputForm
                        text="URL de la Portada"
                        name="coverUrl"
                        value={form.coverUrl || ''}
                        handleChange={handleChange}
                        error={errors?.coverUrl}
                    />
                    <InputForm
                        type="datetime-local"
                        text="Fecha de Publicación"
                        name="publishedAt"
                        value={form.publishedAt || ''}
                        handleChange={handleChange}
                        error={errors?.publishedAt}
                    />
                    <div>
                        <label
                            htmlFor="idCategory"
                            className="block mb-2 text-sm font-semibold text-primary-85"
                        >
                            Categoría:
                        </label>
                        <select
                            id="idCategory"
                            name="idCategory"
                            value={form.idCategory ?? ''}
                            onChange={handleChange}
                            className="w-full input input-bordered"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors?.idCategory && (
                            <p className="text-error text-xs mt-1">{errors.idCategory}</p>
                        )}
                    </div>
                </div>

                {form.coverUrl && (
                    <div className="flex justify-center">
                        <img
                            src={form.coverUrl}
                            alt="Vista previa de la portada"
                            className="h-48 rounded-lg shadow-md border border-primary-60"
                        />
                    </div>
                )}

                <TextAreaInputForm
                    rows={5}
                    text="Descripción"
                    name="description"
                    value={form.description || ''}
                    handleChange={handleChange}
                    error={errors?.description}
                />

                {errors.message && (
                    <div className="text-error text-center font-semibold">
                        ⚠️ {errors.message}
                    </div>
                )}

                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="btn btn-primary w-40"
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="btn btn-secondary w-40"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookForm;
