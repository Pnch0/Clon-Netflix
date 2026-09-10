import React, { useState, useEffect, useRef } from "react";
import './Navbar.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaUserCircle, FaSearch } from "react-icons/fa";

function Navbar(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setInputValue(searchParams.get('q') || '');
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (e) => {
        const valor = e.target.value;
        setInputValue(valor);

        if (valor.trim().length > 0) {
            navigate(`/main-page?q=${encodeURIComponent(valor)}`);
        } else {
            navigate('/main-page');
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/', { replace: true });
    };

    return(
        <>
        <div className="Contenedor-Navbar">
            <div className="ContenedorNavbar-Izquierda">
                <div className="ContenedorNavbarIzquierda-Izquierda">
                    <MdMovie className = "Icono-Navbar"/>
                </div>
                <div className="ContenedorNavbarIzquierda-Derecha">
                    <ul>
                        <li>
                            <NavLink to="/main-page" className="nav-item">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/series-page" className="nav-item">
                                Series
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/films-page" className="nav-item">
                                Peliculas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/list-page" className="nav-item">
                                Mi Lista
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="ContenedorNavbar-Derecha">
                <div className="ContenedorNavbar-Input">
                    <FaSearch className="Icono-Buscador" />
                    <input
                        type="text"
                        placeholder="Titulos, personas, generos"
                        value={inputValue}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <div className="Contenedor-Usuario" ref={dropdownRef}>
                    <FaUserCircle 
                        className="Icono-Usuario" 
                        onClick={toggleDropdown}
                    />
                    
                    {isDropdownOpen && (
                        <div className="Dropdown-Menu">
                            <ul>
                                <li>Perfil</li>
                                <li>Configuración</li>
                                <hr />
                                <li onClick={handleLogout} className="Logout-Item">
                                    Cerrar Sesión
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;