export const fetchAPI = async (endPoint: string, options = {}) => {
    try {
        const response = await fetch(endPoint, {
            ...options,
            credentials: 'include',
        });

        if (response.status === 401) {
            window.location.href = "/login";
            throw new Error("Sesión expirada. Inicia sesión nuevamente");
        }

        // 👇 Comprobamos el tipo de respuesta
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const textData = await response.text();
            throw new Error(
                `Respuesta inesperada del servidor:\n\n${textData.substring(0, 300)}`
            );
        }

        if (!response.ok) {
            if (data?.error) {
                throw data.error;
            } else if (data?.message) {
                throw data.message;
            } else {
                throw { error: data };
            }
        }

        return data;
    } catch (error) {
        console.error("Error en fetchAPI:", error);
        throw error;
    }
};
