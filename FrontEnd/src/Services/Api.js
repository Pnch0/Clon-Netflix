const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';


export const AuthService = {
    login: async (credentials) => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = {};
            }
            throw new Error(errorData.error || errorData.message || errorData.detalle || 'Error al iniciar sesión');
        }

        return await response.json();
    },
};