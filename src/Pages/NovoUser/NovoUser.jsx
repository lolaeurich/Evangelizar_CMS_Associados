import React, { useState, useEffect } from 'react';
import Nav from "../../components/Nav/Nav";
import Rodape from '../../components/Rodape/Rodape';
import axios from 'axios';
import "./style.css";

function NovoUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(0); // Estado para armazenar o tipo de usuário

  useEffect(() => {
    // Recupera o tipo de usuário do localStorage ao carregar o componente
    const tipo = localStorage.getItem('tipo');
    if (tipo && ['1', '2', '3'].includes(tipo)) {
      setTipoUsuario(Number(tipo)); // Converte o tipo para número antes de armazenar no estado
    } else {
      console.error('Tipo de usuário inválido:', tipo);
    }
  }, []); // Executa apenas uma vez ao montar o componente

  const handleCriarUsuario = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submit do formulário

    try {
      // Verifica se o tipo de usuário é válido
      if (![1, 2, 3].includes(tipoUsuario)) {
        console.error('Tipo de usuário inválido:', tipoUsuario);
        return;
      }

      const response = await axios.post('https://arearestritaevangelizar.belogic.com.br/api/usuario', {
        name: nome,
        email: email,
        tipo_id: tipoUsuario, // Envia o tipo de usuário conforme esperado pela API
      });

      console.log('Usuário criado:', response.data);

      // Redireciona para a área logada após criar o usuário com sucesso
      window.location.href = '/AreaLogada';
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      // Tratamento de erro, como exibir mensagem para o usuário
    }
  };

  return (
    <div>
      <Nav />
      <div className="novo-user">
        <div className="container-novoUser">
          <h2 className="jornal-h2" style={{textAlign: "center"}}>Criar Usuário</h2>
          <form onSubmit={handleCriarUsuario}>
            <div className="inputs-jornal">
              <label htmlFor="nome" style={{fontSize: "20px"}}>Nome:</label>
              <input
                type="text"
                id="nome"
                style={{height: "44px"}}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="inputs-jornal">
              <label htmlFor="email" style={{fontSize: "20px"}}>E-mail:</label>
              <input
                type="email"
                id="email"
                style={{height: "44px"}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* Renderiza o campo de permissão apenas se for tipo 3 (App) */}
            {tipoUsuario === 3 && (
              <div className="inputs-jornal">
                <label htmlFor="permissao" style={{fontSize: "20px"}}>Permissão:</label>
                <select
                  id="permissao"
                  style={{height: "44px", paddingInline: "5px", fontSize:"22px"}}
                  value="app"
                  disabled
                >
                  <option style={{fontSize: "18px"}} value="app">App</option>
                </select>
              </div>
            )}
            <button className="user-btn" type="submit">
              Criar usuário
            </button>
          </form>
        </div>
      </div>
      <Rodape />
    </div>
  );
}

export default NovoUser;
