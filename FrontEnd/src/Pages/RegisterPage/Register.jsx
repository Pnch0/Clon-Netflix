import { useState, useEffect } from 'react';
import { UserService } from '../../Services/Api';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';


function RegisterPage(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prev) =>({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
        await UserService.createUser(formData);
        setSuccess('¡Cuenta creada con éxito! Redirigiendo...');

        setFormData({ nombre: '', apellido: '', correo: '', contraseña: '' });

        setTimeout(() => {
            navigate('/main-page');
        }, 2000);
        } catch (err) {
        setError(err.message || 'Ocurrió un error al registrar la cuenta.');
        } finally {
        setLoading(false);
        }
    };

    return(
        <>
        <div className="Contenedor-Centrado">
            <div className="Contenedor-Register">
                <div className="ContenedorBotones-Register">
                    <NavLink to="/" className="Boton-Login">
                        Login
                    </NavLink>
                    <NavLink to="/register-page" className="Boton-Register">
                        Register
                    </NavLink>
                </div>
                <div className="ContenedorFormulario-Register">
                    <form onSubmit={handleSubmit}>
                        <div className="Linea-Doble">
                            <div className="Campo-Formulario">
                                <label htmlFor="Nombre">Nombre:</label>
                                <input 
                                    type="text" 
                                    id="Nombre" 
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Juan" 
                                    required 
                                />
                            </div>
                            <div className="Campo-Formulario">
                                <label htmlFor="Apellido">Apellido:</label>
                                <input 
                                    type="text" 
                                    id="Apellido" 
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="Perez" 
                                    required 
                                />
                            </div>
                        </div>

                        <label htmlFor="Email">Correo: </label>
                        <input 
                            type="email" 
                            id='Email'
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder='ejemplocorreo@gmail.com'
                            required
                        />

                        <label htmlFor="Password">Contraseña: </label>
                        <input 
                            type="password" 
                            id='Password'
                            value={formData.contraseña}
                            onChange={handleChange}
                            placeholder='*************'
                            minLength={6}
                            required
                        />

                        <button
                            type="submit"
                            className="BotonSubmit-Register"
                            disabled={loading}
                        >
                            {loading ? 'Registrando...' : 'Crear Cuenta'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}


export default RegisterPage;