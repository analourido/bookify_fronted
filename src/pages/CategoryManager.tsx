import { FormEvent, useEffect, useState } from "react"
import { CategoryService } from "../services/category.service"
import Category from "../models/Category"
import { Link } from "react-router-dom"

interface CategoryFormProps {
    onSubmit: (e: FormEvent, name: string) => void
}
function CategoryForm({ onSubmit }: CategoryFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e) => onSubmit(e, name)} className="text-white">
            <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="p-2 m-2">Guardar</button>
        </form>
    )
}

interface CategoryListProps {
    categories: Category[]
    onDelete: (id: number) => void
}
function CategoryList({ categories, onDelete }: CategoryListProps) {
    return (
        <div className="text-white">
            {categories.map(category =>
                <div className="m-3 text-primary-90" key={category.id}>
                    {category.name}
                    <Link className="m-2 px-1 py-1 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md"
                        to={`/categories/${category.id}`}> Ver </Link>
                    <button className=" px-1 py-1 text-sm font-medium text-center text-white bg-primary-85 hover:bg-primary-90 rounded-lg transition-all duration-300 ease-in-out shadow-md" onClick={() => onDelete(category.id)}>Borrar</button>
                </div>
            )}
        </div>
    )
}


function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => { // cargar las categorias de la BD
        CategoryService
            .getAll()
            .then(setCategories)
    }, [])

    const handleCreate = async (e: FormEvent, name: string) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("El nombre de la categoría no puede estar vacío.");
            return;
        }

        try {
            const nuevaCategory = await CategoryService.create({ name });
            setCategories([...categories, nuevaCategory]);
        } catch (error) {
            console.error("Error al guardar la categoría:", error);
            alert("Hubo un error al guardar la categoría. Inténtalo de nuevo.");
        }
    };

    const handleDelete = (id: number) => { // borrar una categoria
        if (!window.confirm("¿Estás seguro que quieres borrar esta categoría?"))
            return;
        CategoryService.delete(id)
        setCategories(categories?.filter((category) => category.id !== id));
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center">
            <div className="w-full max-w-4xl flex rounded-lg shadow-md overflow-hidden">
                <img
                    className="object-cover w-1/3 rounded-s-lg"
                    src="../img/categorias4.jpg"
                    alt="Categorías"
                />
                <div className="w-2/3 bg-[rgba(43,54,114,0.13)] p-8">
                    <div className="flex flex-col justify-between leading-normal">
                        <h5 className="mb-4 text-3xl font-extrabold text-primary-90 tracking-tight">
                            Gestión de categorías
                        </h5>
                        <div className="mb-3">
                            <CategoryForm onSubmit={handleCreate} />
                        </div>
                        <div>
                            <CategoryList categories={categories} onDelete={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CategoryManager