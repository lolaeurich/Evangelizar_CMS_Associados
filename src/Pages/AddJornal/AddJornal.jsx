import React, { useState } from "react";
import JSZip from "jszip";
import axios from "axios";

const AddJornal = () => {
  const [lancamento, setLancamento] = useState("");
  const [edicao, setEdicao] = useState("");
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [imagemCapa, setImagemCapa] = useState(null);
  const [arquivoImagens, setArquivoImagens] = useState(null);
  const [edicaoGratuita, setEdicaoGratuita] = useState(false);
  const [imagensDoZip, setImagensDoZip] = useState([]);

  const handleImagemCapaChange = (e) => {
    setImagemCapa(e.target.files[0]);
  };

  const handleArquivoImagensChange = async (e) => {
    const file = e.target.files[0];
    setArquivoImagens(file);

    const zip = new JSZip();
    await zip.loadAsync(file);

    const imagens = [];

    // Convert zip.files to an array of keys (file names)
    const fileNames = Object.keys(zip.files);

    await Promise.all(
      fileNames.map(async (fileName) => {
        const zipEntry = zip.files[fileName];
        if (zipEntry.dir === false && fileName.match(/\.(jpg|jpeg|png)$/i)) {
          const fileBlob = await zip.file(fileName).async("blob");
          imagens.push({ nome: fileName, arquivo: fileBlob });
        }
      })
    );

    console.log("Imagens extraídas do ZIP:", imagens);
    setImagensDoZip(imagens);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lancamento", lancamento);
    formData.append("edicao", edicao);
    formData.append("data_publicacao", dataPublicacao);
    formData.append("imagem_capa", imagemCapa);

    // Adicionar edicao_gratuita_id baseado na seleção do checkbox
    formData.append("edicao_gratuita_id", edicaoGratuita ? "true" : "false");

    // Adicionar imagens do ZIP ao FormData
    imagensDoZip.forEach((imagem, index) => {
      formData.append(`imagens[${index}]`, imagem.arquivo, imagem.nome);
    });

    try {
      const response = await axios.post(
        "https://arearestritaevangelizar.belogic.com.br/api/jornal",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Resposta da API:", response.data);

      // Limpar os campos após o envio bem-sucedido, se necessário
      setLancamento("");
      setEdicao("");
      setDataPublicacao("");
      setImagemCapa(null);
      setArquivoImagens(null);
      setEdicaoGratuita(false);
      setImagensDoZip([]);

      alert("Jornal enviado com sucesso!");

    } catch (error) {
      console.error("Erro ao enviar jornal:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      // Trate o erro conforme necessário
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
