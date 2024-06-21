import React from "react";
import "./style.css";
import logoNav from "../../assets/logo2.png";
import logout from "../../assets/logout.png";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

function Nav() {
    let navigateHome = useNavigate(); 
    const routeChangeHome = () =>{ 
      let path = `/AreaLogada`; 
      navigateHome(path);
    }

    const handleLogout = async () => {
        
        try {
            // Limpar cookies de autenticação
            document.cookie = 'usuLogado=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'usuEmail=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'idDispositivo=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            
            // Gerar um número aleatório para o iddispositivo
            const iddispositivo = Math.floor(Math.random() * 1000000);
            
            // Requisição para a API de logout usando o método POST
            const token = localStorage.getItem('token');
            const response = await axios.post('https://arearestritaevangelizar.belogic.com.br/api/logout', {
                iddispositivo: iddispositivo
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Redirecionar para a página de login (exemplo: '/' representa a rota de login)
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            // Tratamento de erro adequado aqui
        }
    };

    return (
        <div className="nav">
            <img alt="" className="logo-nav" src={logoNav} onClick={routeChangeHome}/>
            <div className="btn-nav">
                <img alt="" src={logout} style={{width: "25px", height: "25px"}}/>
                <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
    );
}

export default Nav;
