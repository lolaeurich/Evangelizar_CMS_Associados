import React, { useState } from "react";
import JSZip from "jszip";
import axios from "axios";

const API_URL = "https://arearestritaevangelizar.belogic.com.br/api";

const AddJornal = () => {
  const [lancamento, setLancamento] = useState("");
  const [edicao, setEdicao] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [imagemCapa, setImagemCapa] = useState(null);
  const [arquivoImagens, setArquivoImagens] = useState([]);
  const [edicaoGratuita, setEdicaoGratuita] = useState(false);

  const handleImagemCapaChange = (e) => {
    setImagemCapa(e.target.files[0]);
  };

  const handleArquivoImagensChange = async (e) => {
    const file = e.target.files[0];
    const zip = new JSZip();

    try {
      await zip.loadAsync(file);

      const fileNames = Object.keys(zip.files);
      const imagens = [];

      await Promise.all(
        fileNames.map(async (fileName) => {
          const zipEntry = zip.files[fileName];
          if (zipEntry.dir === false && fileName.match(/\.(jpg|jpeg|png)$/i)) {
            const fileBlob = await zip.file(fileName).async("blob");
            const imageUrl = URL.createObjectURL(fileBlob); // URL temporária para a imagem
            imagens.push(imageUrl); // Adiciona a URL ao array de imagens
            console.log("Imagem extraída:", fileName);
          }
        })
      );

      setArquivoImagens(imagens); // Atualiza o estado com as URLs das imagens
    } catch (error) {
      console.error("Erro ao processar arquivo ZIP:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lancamento", lancamento);
    formData.append("edicao", edicao);
    formData.append("data_publicacao", dataPublicacao);
    formData.append("imagem_capa", imagemCapa);
    formData.append("edicao_gratuita_id", edicaoGratuita ? "true" : "false");

    // Adiciona URLs das imagens do ZIP ao FormData
    arquivoImagens.forEach((imageUrl, index) => {
      formData.append(`imagens[${index}]`, imageUrl);
    });

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
      setDataPublicacao("");
      setImagemCapa(null);
      setArquivoImagens([]);
      setEdicaoGratuita(false);

      alert("Jornal enviado com sucesso!");

    } catch (error) {
      console.error("Erro ao enviar jornal:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      alert("Erro ao enviar jornal. Verifique os detalhes no console.");
    }
  };

  return (
    <div>
      <h2>Enviar Jornal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="lancamento">Lançamento:</label>
          <input
            type="text"
            id="lancamento"
            value={lancamento}
            onChange={(e) => setLancamento(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="edicao">Edição:</label>
          <input
            type="text"
            id="edicao"
            value={edicao}
            onChange={(e) => setEdicao(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dataPublicacao">Data de Publicação:</label>
          <input
            type="text"
            id="dataPublicacao"
            value={dataPublicacao}
            onChange={(e) => setDataPublicacao(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagemCapa">Imagem de Capa:</label>
          <input
            type="file"
            id="imagemCapa"
            onChange={handleImagemCapaChange}
            accept="image/jpeg,image/png"
            required
          />
        </div>
        <div>
          <label htmlFor="arquivoImagens">Arquivo de Imagens (ZIP):</label>
          <input
            type="file"
            id="arquivoImagens"
            onChange={handleArquivoImagensChange}
            accept=".zip"
            required
          />
        </div>
        <div>
          <label htmlFor="edicaoGratuita">Edição Gratuita:</label>
          <input
            type="checkbox"
            id="edicaoGratuita"
            checked={edicaoGratuita}
            onChange={(e) => setEdicaoGratuita(e.target.checked)}
          />
        </div>
        <button type="submit">Enviar Jornal</button>
      </form>
    </div>
  );
};

export default AddJornal;
