
import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"
import logo from "../../assets/logo.png"

import { useNavigate } from "react-router-dom";
import Rodape from '../../components/Rodape/Rodape';

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Estado para controlar o erro

  const handleLogin = async () => {
    try {
      const payload = {
        email,
        password,
        associado: true
      }

      const response = await axios.post('https://arearestritaevangelizar.belogic.com.br/api/login', payload)
      const { token } = response.data.authorization 

      //todo: armazenar token.
      localStorage.clear()
      localStorage.setItem('token', token)

      setEmail("")
      setPassword("")

      navigate("/areaLogada")
    } catch (error) {
      setError("Login ou senha incorretos!"); // Define a mensagem de erro
    }
  }

  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToPage = (page) => {
    // Implemente a navegação para a página desejada aqui
    console.log("Navegar para:", page);
  };

  return (
    <div>

      {/*MAIN*/}

       {/* Se houver um erro, exibe a popup */}
       {/* {error && (
        <div className="popup-home">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Fechar</button>
        </div>
      )} */}

       <div className='main'>
        <div className='login'>
            <img alt='' className='login-logo' src={logo} />
            <div className='inputs'>
              <label className='label-login'>E-mail</label>
              <input className='input-login' type='email' name="email" onChange={(e) => setEmail(e.target.value)}/>
              <label className='label-login'>Senha</label>
              <div className='input-container'>
                <input className='input-login' type={showPassword ? 'text' : 'password'} value={password} name="senha" onChange={(e) => setPassword(e.target.value)}/>
                {/* <img   className="eye-icon"
                alt="Toggle Password Visibility"
                onClick={togglePasswordVisibility} /> */}
              </div>
            </div>
            <button className="btn-login" onClick={handleLogin}>
                <span>Entrar</span>
                <img className="arrow2" alt="" />
            </button>
        </div>    
      </div>

      <Rodape />

    </div>
  );
}

export default Login;