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


export const UserService = {
    createUser: async (userData) =>{
        try{
            const response = await fetch(`${API_URL}/users`,{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || 'Errro al registrar el usuario.');
            }

            return await response.json();
        
        } catch (error){
            console.error("Error en el servicio createUser: ", error.message);
            throw error;
        }
    },
}


export const MovieService = {
    getTrending: async (mediaType = 'all', timeWindow = 'week') => {
        try {
            const response = await fetch(`${API_URL}/trending?mediaType=${mediaType}&timeWindow=${timeWindow}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al obtener las tendencias.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getTrending: ", error.message);
            throw error;
        }
    },

    getMoviesByCategory: async (category = 'popular', page = 1) => {
        try {
            const response = await fetch(`${API_URL}/movies/category/${category}?page=${page}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error al obtener películas de la categoría ${category}.`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getMoviesByCategory: ", error.message);
            throw error;
        }
    },

    getTvShowsByCategory: async (category = 'popular', page = 1) => {
        try {
            const response = await fetch(`${API_URL}/tv/category/${category}?page=${page}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Error al obtener series de la categoría ${category}.`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getTvShowsByCategory: ", error.message);
            throw error;
        }
    },

    getMovieDetails: async (id) => {
        try {
            const response = await fetch(`${API_URL}/movie/${id}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al obtener los detalles de la película.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getMovieDetails: ", error.message);
            throw error;
        }
    },

    getTvDetails: async (id) => {
        try {
            const response = await fetch(`${API_URL}/tv/${id}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al obtener los detalles de la serie.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getTvDetails: ", error.message);
            throw error;
        }
    },

    discoverByGenre: async (mediaType = 'movie', genreId, page = 1) => {
        try {
            const response = await fetch(`${API_URL}/discover/${mediaType}/${genreId}?page=${page}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al filtrar por género.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.discoverByGenre: ", error.message);
            throw error;
        }
    },

    getGenres: async (mediaType = 'movie') => {
        try {
            const response = await fetch(`${API_URL}/genres/${mediaType}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al obtener la lista de géneros.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.getGenres: ", error.message);
            throw error;
        }
    },

    searchMulti: async (query, page = 1) => {
        try {
            const response = await fetch(`${API_URL}/search?query=${encodeURIComponent(query)}&page=${page}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error en la búsqueda.');
            }
            return await response.json();
        } catch (error) {
            console.error("Error en MovieService.searchMulti: ", error.message);
            throw error;
        }
    }
};