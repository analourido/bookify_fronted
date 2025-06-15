import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/auth.services";
import Member from "../models/Member";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

interface UserPayload {
    clubMembers: Member[] // Aquí puedes definir el tipo de clubMembers si lo conoces;
    id: number
    email: string
    role: string
}

interface AuthContextType {
    user: UserPayload | null  // Partial<User>
    isAuthenticated: boolean
    isAdmin: boolean
    loading: boolean;
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>({ // Es mejor proporcionar un objeto vacío con funciones noop para evitar verificaciones innecesarias en useAuth()
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    login: async () => { },
    logout: async () => { },
    loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserPayload | null>(null)
    const [loading, setLoading] = useState(true);



    // Carga el contexto la primera vez que la app arranca
    useEffect(() => {
        async function callBack() {
            try {
                const response = await fetch(API_URL_BASE + '/auth/users', { credentials: 'include' });
                if (!response.ok) throw new Error("No autenticado");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error al cargar el usuario', error);
                setUser(null);
            } finally {
                setLoading(false); // importante
            }
        }
        callBack();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const a = await AuthService.loginUser(email, password)
            const response = await fetch(API_URL_BASE + '/auth/users', { credentials: 'include' })
            if (!response.ok) throw new Error("No autenticado");
            const data = await response.json()
            console.log('Usuario logueado:', data)
            console.log('Usuario logueado token:', a)
            setUser(data)
        } catch (error) {
            console.error("Error en el login:", error);
            throw new Error("Error en el login")
        }
    }

    const logout = async () => {
        // conexión con el backend
        await fetch(API_URL_BASE + '/auth/logout', { method: 'POST', credentials: 'include' })
        setUser(null)
    }

    return <AuthContext.Provider value={
        { user, login, logout, loading, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }
    }>
        {children}
    </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        console.warn("useAuth se está usando fuera del AuthProvider");
        return { user: null, isAuthenticated: false, isAdmin: false, login: () => { }, logout: () => { } };
    }
    return context
}