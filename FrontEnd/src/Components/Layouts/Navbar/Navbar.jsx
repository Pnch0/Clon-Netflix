import React from "react";
import './Navbar.css';
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
                        <li>Home</li>
                        <li>Series</li>
                        <li>Peliculas</li>
                        <li>Mi Lista</li>
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