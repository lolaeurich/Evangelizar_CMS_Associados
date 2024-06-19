import React, { useState } from 'react';
import axios from 'axios';
import Rodape from '../../components/Rodape/Rodape';
import logo from "../../assets/logo.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Verifica se os campos estão preenchidos
      if (!email || !password) {
        setError("Por favor, preencha todos os campos.");
        return;
      }
  
      const response = await axios.post('https://arearestritaevangelizar.belogic.com.br/api/login', {
        email: email,
        password: password,
        associado: false
      });
  
      if (response.status === 200) {
        const token = response.data.authorization.token;
        localStorage.setItem('token', token);
        navigate('/AreaLogada');
      } else {
        setError("Login ou senha incorretos!");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError("Erro ao fazer login. Verifique os detalhes no console.");
    }
  };
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
          <button className="btn-login" onClick={handleLogin}>
            <span>Entrar</span>
            <img className="arrow2" alt="" />
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      {/* Rodapé */}
      <Rodape />
    </div>
  );
}

export default Login;
