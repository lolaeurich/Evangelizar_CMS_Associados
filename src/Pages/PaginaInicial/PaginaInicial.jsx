import React, { useState } from 'react';
import Rodape from '../../components/Rodape/Rodape';
import Nav from "../../components/Nav/Nav"
import logo from "../../assets/logo.svg";
import phone from "../../assets/phone.png"
import user from "../../assets/user.png"
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from'react-router-dom';
import "./style.css";
import { useNavigate } from "react-router-dom";


function PaginaInicial() {
    let navigateRestrita = useNavigate(); 
    const routeChangeRestrita = () =>{ 
      let path = `/AreaLogada`; 
      navigateRestrita(path);
    }

    const handleButtonClick = () => {
        // Redireciona para o site desejado quando o botão é clicado
        window.location.href = 'https://app.aevp.com.br/';
    };

    return (
        <div>
            <Nav />
            <div className="areaLogada">
                <div className='titulo-pagina-inicial'>
                    <h3 className="areaLogada-h3">Selecione o CMS que deseja acessar:</h3>
                </div>
                <div className="opcoes-container">
                    <div className="opcao-inicial" onClick={handleButtonClick}>
                    <img alt="" src={phone} style={{width: "50px", height: "50px", paddingRight: "5px"}}></img>
                        <h4>CMS APP</h4>
                    </div>
                    <div className="opcao-inicial" onClick={routeChangeRestrita}>
                        <img alt="" src={user} style={{width: "50px", height: "50px", paddingRight: "10px"}}></img>
                        <h4>CMS ÁREA RESTRITA</h4>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default PaginaInicial;
