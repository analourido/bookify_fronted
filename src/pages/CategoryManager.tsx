import { FormEvent, useEffect, useState } from "react";
import { CategoryService } from "../services/category.service";
import Category from "../models/Category";
import { Link } from "react-router-dom";

interface CategoryFormProps {
    onSubmit: (e: FormEvent, name: string) => void;
}

function CategoryForm({ onSubmit }: CategoryFormProps) {
    const [name, setName] = useState("");
    return (
        <form
            onSubmit={(e) => onSubmit(e, name)}
            className="flex items-center gap-2 mb-4"
        >
            <input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nueva categoría"
                className="input input-bordered w-full"
            />
            <button type="submit" className="btn btn-primary">
                Guardar
            </button>
        </form>
    );
}

interface CategoryListProps {
    categories: Category[];
    onDelete: (id: number) => void;
}

function CategoryList({ categories, onDelete }: CategoryListProps) {
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                Lista de categorías
            </li>
            {categories.map((category) => (
                <li
                    key={category.id}
                    className="list-row flex items-center justify-between hover:bg-[rgba(43,54,114,0.05)] rounded transition-all"
                >
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="font-semibold text-primary-90">{category.name}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">
                                ID: {category.id}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/categories/${category.id}`}
                            className="btn btn-square btn-ghost"
                            title="Ver"
                        >
                            {/* Icono de ojo */}
                            <svg
                                className="size-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </Link>
                        <button
                            onClick={() => onDelete(category.id)}
                            className="btn btn-square btn-ghost"
                            title="Eliminar"
                        >
                            {/* Icono de papelera */}
                            <svg
                                className="size-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        CategoryService.getAll().then(setCategories);
    }, []);

    const handleCreate = async (e: FormEvent, name: string) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("El nombre de la categoría no puede estar vacío.");
            return;
        }

        try {
            const newCategory = await CategoryService.create({ name });
            setCategories([...categories, newCategory]);
        } catch (error) {
            console.error("Error al guardar la categoría:", error);
            alert("Hubo un error al guardar la categoría. Inténtalo de nuevo.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar esta categoría?"))
            return;
        await CategoryService.delete(id);
        setCategories(categories.filter((category) => category.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-extrabold text-primary-90 mb-4">
                Gestión de Categorías
            </h2>
            <CategoryForm onSubmit={handleCreate} />
            <CategoryList categories={categories} onDelete={handleDelete} />
        </div>
    );
}

export default CategoryManager;
