import React from "react";
import "./style.css";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import ChartComponentTest from "../../components/Charts/TestemunhosChart";
import TabelaVelas from "../../components/Tables/TableVelas";
import TabelaTest from "../../components/Tables/TableTestemunhos";

function Testemunhos () {
    return (
        <div>
            <Nav />
            <div className="velas-container">

                <div className="container-de-graficos">

                    {/* PŔIMEIRO GRÁFICO */}
                    <div className="velas-grafico-pizza">
                        <ChartComponentTest />
                    </div>

                </div>

                {/* EXCEL */}
               
                    <TabelaTest />
                
            </div>
            <Rodape />
        </div>
    )
}

export default Testemunhos;