import './Login.css';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthService } from '../../Services/Api.js';
import { toast } from 'sonner';

function LoginPage(){
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [verPassword, setVerPassword] = useState(false);
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        console.log("Enviando datos: ", { correo, contraseña });

        try {
            const data = await AuthService.login({ correo, contraseña });

            console.log("Sesión iniciada con éxito: ", data);

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            if (data.user) {
                localStorage.setItem('usuario', JSON.stringify(data.user));
            }

            toast.success(`¡Bienvenido de vuelta${data.user?.nombre ? `, ${data.user.nombre}` : ''}!`, {
                description: 'Iniciando sesión correctamente.',
            });

            setTimeout(() => {
                navigate('/main-page');
            }, 1500);

        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            toast.error('Error al iniciar sesión', {
                description: error.response?.data?.message || error.message || 'Credenciales incorrectas.',
            });

        } finally {
            setCargando(false);
        }
    };

    return(
        <>
        <div className="Contenedor-Centrado">
            <div className="Contenedor-LoginPage">
                <div className="ContenedorBotones-Login">
                    <NavLink to="/" className="Boton-Login">
                        Login
                    </NavLink>
                    <NavLink to="/register-page" className="Boton-Register">
                        Register
                    </NavLink>
                </div>
                <div className="ContenedorFormulario-Login">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="Email">Correo: </label>
                        <input 
                            type="email" 
                            id='Email'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder='ejemplocorreo@gmail.com'
                            required
                        />


                        <label htmlFor="Contraseña">Contraseña: </label>
                        <input 
                            type="password" 
                            id='Contraseña'
                            value={contraseña}
                            onChange={(e)=> setContraseña(e.target.value)}
                            placeholder='*************'
                            required
                        />

                        <button type='submit' className="BotonSubmit-Login" disabled={cargando}>
                            {cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        
        </>
    )
}


export default LoginPage;