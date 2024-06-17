import React from "react";
import "./style.css";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";

function Velas () {
    return (
        <div>
            <Nav />
            <div className="velas-container">

                <div className="container-de-graficos">

                    {/* PŔIMEIRO GRÁFICO */}
                    <div className="velas-grafico-pizza">

                    </div>

                    {/* SEGUNDO GRÁFICO */}
                    <div className="velas-grafico-mes">

                    </div>

                </div>

                {/* EXCEL */}
                <div className="velas-excel">

                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default Velas;