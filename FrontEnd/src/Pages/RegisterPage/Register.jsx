import './Register.css';
import { NavLink } from 'react-router-dom';


function RegisterPage(){

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
                    <form>
                        <div className="Linea-Doble">
                            <div className="Campo-Formulario">
                                <label htmlFor="Nombre">Nombre:</label>
                                <input 
                                    type="text" 
                                    id="Nombre" 
                                    placeholder="Juan" 
                                    required 
                                />
                            </div>
                            <div className="Campo-Formulario">
                                <label htmlFor="Apellido">Apellido:</label>
                                <input 
                                    type="text" 
                                    id="Apellido" 
                                    placeholder="Perez" 
                                    required 
                                />
                            </div>
                        </div>

                        <label htmlFor="Email">Correo: </label>
                        <input 
                            type="email" 
                            id='Email'
                            placeholder='ejemplocorreo@gmail.com'
                            required
                        />

                        <label htmlFor="Password">Contraseña: </label>
                        <input 
                            type="password" 
                            id='Password'
                            placeholder='*************'
                            required
                        />

                        <button type='Submit' className='BotonSubmit-Register'>Iniciar Sesion</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}


export default RegisterPage;