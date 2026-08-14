import './Login.css';
import { NavLink } from 'react-router-dom';

function LoginPage(){

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
                    <form>
                        <label htmlFor="Email">Correo: </label>
                        <input 
                            type="email" 
                            id='Email'
                            placeholder='ejemplocorreo@gmail.com'
                            required
                        />


                        <label htmlFor="Contraseña">Contraseña: </label>
                        <input 
                            type="password" 
                            id='Contraseña'
                            placeholder='*************'
                            required
                        />

                        <button type='Submit' className='BotonSubmit-Login'>Iniciar Sesion</button>
                    </form>
                </div>
            </div>
        </div>
        
        </>
    )
}


export default LoginPage;