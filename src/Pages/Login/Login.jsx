import React, { useState } from 'react';
import axios from 'axios';
import Rodape from '../../components/Rodape/Rodape';
import logo from "../../assets/logo.svg";
import eye from "../../assets/eye.png";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        associado: false, 
        tipo: 1
      });
  
      if (response.status === 200) {
        const token = response.data.authorization.token;
        localStorage.setItem('token', token);
        navigate('/PaginaInicial');
      } else {
        setError("Login ou senha incorretos!");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError("Erro ao fazer login. Verifique os detalhes no console.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }; 

  return (
    <div>
      {/* Formulário de login */}
      <div className='main'>
        <div className='login'>
          <img alt='' className='login-logo' src={logo} />
          <div className='inputs'>
            <label className='label-login'>Login</label>
            <input className='input-login' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label className='label-login'>Senha</label>
            <div className='eye-input'>
              <input className='input-login' type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
              <img  className="eye-icon"
                alt="Toggle Password Visibility"
                src={eye}
                onClick={togglePasswordVisibility} />
            </div>
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
