import React from "react";
import "./style.css";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import ChartComponent from "../../components/Charts/VelasChart";
import ChartVelasPorMes from "../../components/Charts/VelasPorMesChart";
import TabelaVelas from "../../components/Tables/TableVelas";

function Testemunhos () {
    return (
        <div>
            <Nav />
            <div className="velas-container">

                <div className="container-de-graficos">

                    {/* PŔIMEIRO GRÁFICO */}
                    <div className="velas-grafico-pizza">
                        <ChartComponent />
                    </div>

                    {/* SEGUNDO GRÁFICO */}
                    <div className="velas-grafico-mes">
                        <ChartVelasPorMes />
                    </div>

                </div>

                {/* EXCEL */}
               
                    <TabelaVelas />
                
            </div>
            <Rodape />
        </div>
    )
}

export default Testemunhos;