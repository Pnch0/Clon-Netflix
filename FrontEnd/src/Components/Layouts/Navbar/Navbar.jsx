import React from "react";
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaUserCircle, FaSearch } from "react-icons/fa";

function Navbar(){

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
                    />
                </div>
                <FaUserCircle className="Icono-Usuario"/>
            </div>
        </div>
        </>
    )
}

export default Navbar;