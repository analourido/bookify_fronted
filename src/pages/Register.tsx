import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthService } from "../services/auth.services";
import User from "../models/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMsgData from "../utils/ErrorMsgData";
import InputForm from "../components/InputForm";

const Register: React.FC = () => {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    acceptNotifications: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      setErrors({});

      e.preventDefault();

      await AuthService.registerUser(form);

      toast.success("Usuario registrado con éxito!");
      navigate("/books");
    } catch (error) {
      toast.error("Error al registrar el usuario.");

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
      setLoading(false);
    }
  };


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    //if(name==='idCategory') valueNew = Number(value)
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({ ...form, [name]: checked });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form className="max-w-sm mx-auto min-w-sm bg-[rgba(43,54,114,0.13)] p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center text-primary-90 mb-6">Regístrate</h2>

      <InputForm
        text="Nombre"
        name="name"
        value={form.name || ''}
        handleChange={handleChange}
        error={errors.name}
      />

      <InputForm
        text="Apellidos"
        name="surname"
        value={form.surname || ''}
        handleChange={handleChange}
        error={errors.surname}
      />

      <InputForm
        text="Email"
        name="email"
        value={form.email || ''}
        handleChange={handleChange}
        error={errors.email}
      />

      <InputForm
        text="Password"
        name="password"
        type="password" // Asegúrate de que el campo sea seguro
        value={form.password || ''}
        handleChange={handleChange}
        error={errors.password}
      />

      {/* Checkbox para aceptar notificaciones */}
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="acceptNotifications"
            name="acceptNotifications"
            type="checkbox"
            checked={form.acceptNotifications || false}
            onChange={handleChangeCheckbox}
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-primary-85 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-90 dark:ring-offset-gray-800"
          />
        </div>

        <label
          htmlFor="acceptNotifications"
          className="ms-2 text-sm font-medium text-primary-85 dark:text-primary-70"
        >
          ¿Aceptas recibir notificaciones?
        </label>

        {errors.acceptNotifications && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.acceptNotifications}
          </p>
        )}
      </div>

      {/* Mensaje de error general */}
      {errors && errors.message && (
        <p className="text-center mt-4 text-red-500">{errors.message}</p>
      )}

      {/* Botón de enviar */}
      <button
        type="submit"
        className=" bg-primary-85 hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-60 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
      >
        Registrarse
      </button>
    </form>

  );
};

export default Register;