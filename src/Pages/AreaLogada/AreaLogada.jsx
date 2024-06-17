import React from "react";
import "./style.css";
import Rodape from "../../components/Rodape/Rodape";
import Nav from "../../components/Nav/Nav";

function AreaLogada () {
    return (
        <div>
            <Nav />
            <div className="areaLogada">
                <h3 className="areaLogada-h3">Bem-vindo ao CMS Evangelizar! Selecione a opção desejada:</h3>
                <div className="opcoes-container">
                    <div className="opcao">
                        <h4>Velas</h4>
                    </div>
                    <div className="opcao">
                        <h4>Testemunhos</h4>
                    </div>
                    <div className="opcao">
                        <h4>Revistas</h4>
                    </div>
                    <div className="opcao">
                        <h4>Jornais</h4>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default AreaLogada;