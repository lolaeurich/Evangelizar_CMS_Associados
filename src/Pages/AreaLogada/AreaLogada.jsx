import React from "react";
import "./style.css";
import Rodape from "../../components/Rodape/Rodape";
import Nav from "../../components/Nav/Nav";
import Chart from 'chart.js/auto';

import { useNavigate } from "react-router-dom";

function AreaLogada () {

    let navigateVela = useNavigate(); 
    const routeChangeVelas = () =>{ 
      let path = `/Velas`; 
      navigateVela(path);
    }

    let navigateJornal = useNavigate(); 
    const routeChangeJornal = () =>{ 
      let path = `/Jornais`; 
      navigateJornal(path);
    }

    let navigateRevista = useNavigate(); 
    const routeChangeRevista = () =>{ 
      let path = `/Revistas`; 
      navigateRevista(path);
    }

    return (
        <div>
            <Nav />
            <div className="areaLogada">
                <h3 className="areaLogada-h3">Bem-vindo ao CMS Evangelizar! Selecione a opção desejada:</h3>
                <div className="opcoes-container">
                    <div className="opcao" onClick={routeChangeVelas}>
                        <h4>Velas</h4>
                    </div>
                    <div className="opcao">
                        <h4>Testemunhos</h4>
                    </div>
                    <div className="opcao" onClick={routeChangeRevista}>
                        <h4>Revistas</h4>
                    </div>
                    <div className="opcao" onClick={routeChangeJornal}>
                        <h4>Jornais</h4>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default AreaLogada;