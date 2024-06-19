import React, { useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import DatePicker from "react-datepicker"; // Importa o DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Estilos padrão do DatePicker
import "../AddJornal/style.css";

const API_URL = "https://arearestritaevangelizar.belogic.com.br/api";

const AddJornal = () => {
  const [lancamento, setLancamento] = useState("");
  const [edicao, setEdicao] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState(new Date()); // Estado para a data de publicação
  const [imagemCapa, setImagemCapa] = useState(null);
  const [arquivoImagens, setArquivoImagens] = useState(null);
  const [edicaoGratuita, setEdicaoGratuita] = useState(false);

  const handleImagemCapaChange = (e) => {
    setImagemCapa(e.target.files[0]);
  };

  const handleArquivoImagensChange = async (e) => {
    const file = e.target.files[0];

    try {
      setArquivoImagens(file);
    } catch (error) {
      console.error("Erro ao processar arquivo ZIP:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lancamento", lancamento);
    formData.append("edicao", edicao);
    formData.append(
      "data_publicacao",
      dataPublicacao.toISOString().split("T")[0] // Converte a data para o formato adequado
    );
    formData.append("imagem_capa", imagemCapa);
    formData.append("arquivo", arquivoImagens);
    formData.append("edicao_gratuita_id", edicaoGratuita ? "true" : "false");

    try {
      const response = await axios.post(`${API_URL}/jornal`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Resposta da API:", response.data);

      // Limpa os campos após o envio bem-sucedido
      setLancamento("");
      setEdicao("");
      setDataPublicacao(new Date()); // Reseta para a data atual
      setImagemCapa(null);
      setArquivoImagens(null);
      setEdicaoGratuita(false);

      alert("Jornal enviado com sucesso!");

    } catch (error) {
      console.error("Erro ao enviar revista:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      alert("Erro ao enviar revista. Verifique os detalhes no console.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="jornal-main">
        <h2 className="jornal-h2">Enviar Jornal</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs-jornal">
            <label htmlFor="lancamento">Lançamento:</label>
            <input
              type="text"
              id="lancamento"
              value={lancamento}
              onChange={(e) => setLancamento(e.target.value)}
              required
            />
          </div>
          <div className="inputs-jornal">
            <label htmlFor="edicao">Edição:</label>
            <input
              type="text"
              id="edicao"
              value={edicao}
              onChange={(e) => setEdicao(e.target.value)}
              required
            />
          </div>
          <div className="inputs-jornal">
            <label htmlFor="dataPublicacao">Data de Publicação:</label>
            <br />
            <DatePicker
              selected={dataPublicacao}
              onChange={(date) => setDataPublicacao(date)}
              dateFormat="dd/MM/yyyy"
              className="input-date"
            />
          </div>
          <div className="inputs-jornal">
            <label htmlFor="imagemCapa">Imagem de Capa:</label>
            <input
              type="file"
              id="imagemCapa"
              onChange={handleImagemCapaChange}
              accept="image/jpeg,image/png"
            />
          </div>
          <div className="inputs-jornal">
            <label htmlFor="arquivoImagens">Arquivo de Imagens (ZIP):</label>
            <input
              type="file"
              id="arquivoImagens"
              onChange={handleArquivoImagensChange}
              accept=".zip"
            />
          </div>
          <div>
            <label htmlFor="edicaoGratuita">
              Edição Gratuita (marque esse campo apenas se a afirmação for positiva):
            </label>
            <input
              type="checkbox"
              id="edicaoGratuita"
              checked={edicaoGratuita}
              onChange={(e) => setEdicaoGratuita(e.target.checked)}
            />
          </div>
          <button className="jornal-btn" type="submit">
            Enviar Revista
          </button>
        </form>
      </div>
      <Rodape />
    </div>
  );
};

export default AddJornal;
