import React from "react";
import { useState, useEffect } from "react";
import './Navbar.css';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaUserCircle, FaSearch } from "react-icons/fa";

function Navbar(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');

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
                        <li><NavLink to="/list-page" className="nav-item">
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
                <FaUserCircle className="Icono-Usuario"/>
            </div>
        </div>
        </>
    )
}

export default Navbar;