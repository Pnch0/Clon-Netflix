import './MainPage.css';

function MainPage(){

    return(
        <>
        <div className="Contenedor-MainPage">
            <div className="Contenedor-PeliculaPrincipal">
            
            </div>

            <div className="Contenedor-Tendencias">
                <div className="Contenedor-TextoTendecias">
                    <h2>Tendencias</h2>
                </div>
                <div className="Contenedor-PeliculasTendencias">
                    <div className="Movie-Card">

                    </div>
                </div>
            </div>

            <div className="Contenedor-Accion">
                <div className="Contenedor-TextoAccion">
                    <h2>Accion</h2>
                </div>
                <div className="Contenedor-PeliculasAccion">
                    <div className="Movie-Card">

                    </div>
                </div>
            </div>

            <div className="Contenedor-Series">
                <div className="Contenedor-TextoSeries">
                    <h2>Series</h2>
                </div>
                <div className="Contenedor-ListadosSeries">
                    <div className="Movie-Card">

                    </div>
                </div>
            </div>

            <div className="Contenedor-Anime">
                <div className="Contenedor-TextoAnime">
                    <h2>Anime</h2>
                </div>
                <div className="Contenedor-ListadosAnime">
                    <div className="Movie-Card">

                    </div>
                </div>
            </div>

        </div>
        </>
    )
}


export default MainPage;