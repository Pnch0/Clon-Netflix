import React, { useState, useEffect } from "react";
import './Navbar.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Navbar(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setInputValue(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const valor = e.target.value;
        setInputValue(valor);

        if (valor.trim().length > 0) {
            navigate(`/main-page?q=${encodeURIComponent(valor)}`);
        } else {
            navigate('/main-page');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return(
        <>
        <div className="Contenedor-Navbar">
            <div className="ContenedorNavbar-Izquierda">
                <div className="ContenedorNavbarIzquierda-Izquierda">
                    <MdMovie className="Icono-Navbar"/>
                </div>
                
                <div className="Mobile-Menu-Toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <div className={`ContenedorNavbarIzquierda-Derecha ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <NavLink to="/main-page" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/series-page" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Series
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/films-page" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Peliculas
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className={`ContenedorNavbar-Derecha ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="ContenedorNavbar-Input">
                    <FaSearch className="Icono-Buscador" />
                    <input
                        type="text"
                        placeholder="Titulos, personas, generos"
                        value={inputValue}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <div className="Contenedor-Logout" onClick={handleLogout}>
                    Cerrar Sesión
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;