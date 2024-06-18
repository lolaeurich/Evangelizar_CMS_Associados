import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom'; // Importe o useHistory
import Rodape from '../../components/Rodape/Rodape';
import logo from "../../assets/logo.png";
import "./style.css";

import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const history = useHistory(); // Obtenha a instância do useHistory

  // const handleLogin = async () => {
  //   try {
  //     // Verifique se o e-mail e senha correspondem aos dados fixos
  //     if (email === "nucleodigital2@evangelizarepreciso.com.br" && password === "Evangelizar@2024") {
  //       const payload = {
  //         email,
  //         password,
  //         associado: false // De acordo com o exemplo, associado deve ser false
  //       };

  //       // Simula a requisição para a API com dados estáticos
  //       const response = { data: { authorization: { token: "seu-token-de-exemplo" } } };

  //       //todo: armazenar token.
  //       localStorage.clear();
  //       localStorage.setItem('token', response.data.authorization.token);

  //       setEmail("");
  //       setPassword("");

  //       // Navegue para a página de área logada
  //       history.push("/AreaLogada");
  //     } else {
  //       setError("Login ou senha incorretos!"); // Define a mensagem de erro
  //     }
  //   } catch (error) {
  //     console.error("Erro ao fazer login:", error);
  //     setError("Erro ao fazer login. Verifique os detalhes no console.");
  //   }
  // };

  let navigateLog = useNavigate(); 
  const routeChangeLog = () =>{ 
    let path = `/AreaLogada`; 
    navigateLog(path);
  }

  return (
    <div>
      {/* Formulário de login */}
      <div className='main'>
        <div className='login'>
          <img alt='' className='login-logo' src={logo} />
          <div className='inputs'>
            <label className='label-login'>E-mail</label>
            <input className='input-login' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className='label-login'>Senha</label>
            <input className='input-login' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn-login" onClick={routeChangeLog}>
            <span>Entrar</span>
            <img className="arrow2" alt="" />
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
}

export default Login;
