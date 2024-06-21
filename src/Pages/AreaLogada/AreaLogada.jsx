import React from "react";
import "./style.css";
import Rodape from "../../components/Rodape/Rodape";
import Nav from "../../components/Nav/Nav";
import Chart from 'chart.js/auto';
import vela from "../../assets/vela-amarela.png"
import Testemunho from "../../assets/testemunho.png"
import jornal from "../../assets/jornal.png"
import revista from "../../assets/revista-amarela.png"

import { useNavigate } from "react-router-dom";

function AreaLogada () {

    let navigateVela = useNavigate(); 
    const routeChangeVelas = () =>{ 
      let path = `/Velas`; 
      navigateVela(path);
    }

    let navigateTest = useNavigate(); 
    const routeChangeTest = () =>{ 
      let path = `/Testemunhos`; 
      navigateTest(path);
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
                    <img alt="" src={vela} style={{width: "30px", height: "30px", paddingRight: "5px"}}></img>
                        <h4>Velas</h4>
                    </div>
                    <div className="opcao" onClick={routeChangeTest}>
                        <img alt="" src={Testemunho} style={{width: "30px", height: "30px", paddingRight: "10px"}}></img>
                        <h4>Testemunhos</h4>
                    </div>
                    <div className="opcao" onClick={routeChangeRevista}>
                        <img alt="" src={revista} style={{width: "30px", height: "30px", paddingRight: "10px"}}></img>
                        <h4>Revistas</h4>
                    </div>
                    <div className="opcao" onClick={routeChangeJornal}>
                        <img alt="" src={jornal} style={{width: "30px", height: "30px", paddingRight: "10px"}}></img>
                        <h4>Jornais</h4>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default AreaLogada;