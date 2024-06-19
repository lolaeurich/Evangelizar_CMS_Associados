import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import CitiesDropdown from '../Cities/CitiesDropdown';

const TabelaTest = () => {
  const [testemunhos, setTestemunhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState([]);
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const [motivos, setMotivos] = useState([]);
  const [filtroMotivo, setFiltroMotivo] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  useEffect(() => {
    fetchTestemunhosData();
    fetchMotivos();
  }, []);

  const fetchTestemunhosData = async () => {
    try {
      const response = await axios.get('https://arearestritaevangelizar.belogic.com.br/api/testemunho', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Dados inválidos recebidos da API');
      }

      setTestemunhos(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados de testemunhos:', error);
      setLoading(false);
    }
  };

  const fetchMotivos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://arearestritaevangelizar.belogic.com.br/api/testemunho/motivos', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Resposta da API de motivos:', response);
  
      if (!response || response.status !== 200) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }
  
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Dados inválidos recebidos da API de motivos');
      }
  
      // Mapeia os motivos para um array contendo apenas os nomes
      const nomesMotivos = response.data.data.map(motivo => motivo.nome);
      setMotivos(nomesMotivos);
    } catch (error) {
      console.error('Erro ao buscar motivos:', error.message);
      // Tratamento de erro adequado aqui
    }
  };

  const handleFilterChange = (filtro) => {
    const index = filtros.findIndex(f => f.campo === filtro.campo);
    if (index === -1) {
      setFiltros([...filtros, filtro]);
    } else {
      const novosFiltros = [...filtros];
      novosFiltros[index] = filtro;
      setFiltros(novosFiltros);
    }
  };

  const handleCityFilterChange = (cidade) => {
    setCidadeFiltro(cidade);
    handleFilterChange({ campo: 'cidade', valor: cidade });
  };

  const handleMotivoFilterChange = (motivo) => {
    setFiltroMotivo(motivo);
    handleFilterChange({ campo: 'motivo', valor: motivo });
  };

  const handleTituloFilterChange = (titulo) => {
    setFiltroTitulo(titulo);
    handleFilterChange({ campo: 'titulo', valor: titulo });
  };

  const clearFilters = () => {
    setFiltros([]);
    setCidadeFiltro('');
    setFiltroMotivo('');
    setFiltroTitulo('');
  };

  const applyFilters = (data) => {
    return data.filter(item => {
      return filtros.every(filtro => {
        const valorFiltro = filtro.valor.toLowerCase(); // Convertendo para minúsculas
  
        if (filtro.campo === 'cidade') {
          return item.cidade.toLowerCase().includes(valorFiltro);
        } else if (filtro.campo === 'motivo') {
          // Verifica se item.motivo é um objeto com a propriedade nome
          const motivo = typeof item.motivo === 'object' && item.motivo.nome ? item.motivo.nome.toLowerCase() : String(item.motivo).toLowerCase();
          return motivo.includes(valorFiltro);
        } else if (filtro.campo === 'titulo') {
          return item.titulo.toLowerCase().includes(valorFiltro);
        }
        // Se não for nenhum dos casos acima, converte para string antes de aplicar toLowerCase()
        return String(item[filtro.campo]).toLowerCase().includes(valorFiltro);
      });
    });
  };
  
  

  const exportToExcel = () => {
    const dadosExportar = filtros.length > 0 ? applyFilters(testemunhos) : testemunhos;
    const worksheet = XLSX.utils.json_to_sheet(dadosExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Testemunhos');
    const excelFileName = 'testemunhos.xlsx';
    XLSX.writeFile(workbook, excelFileName);
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className='velas-excel'>
      <div className='nav-table'>
        <h2 className='tabela-velas-h2' style={{fontSize: "14px", paddingRight: "10px"}}>Lista de Testemunhos</h2>
        <div className='filtros'>
          <input
            type="text"
            placeholder="Filtrar por título"
            value={filtroTitulo}
            onChange={(e) => handleTituloFilterChange(e.target.value)}
          />
          <select
            value={filtroMotivo}
            onChange={(e) => handleMotivoFilterChange(e.target.value)}
          >
            <option value="">Filtrar por motivo</option>
            {motivos.map((motivo, index) => (
              <option key={index} value={motivo}>
                {motivo}
              </option>
            ))}
          </select>
          <CitiesDropdown
            onSelectCity={handleCityFilterChange}
            filtro={cidadeFiltro}
            setFiltro={setCidadeFiltro}
          />
          <button className='limpar-filtros' onClick={clearFilters} style={{ height: "33px", border: "solid 1px #000", textAlign: "center" }}>Limpar Filtros</button>
        </div>
        <button className='export-button' onClick={exportToExcel} style={{width: "120px", fontSize: "10px"}}>
          Exportar para Excel
        </button>
      </div>
      <div className='tabela-scroll'>
        <table className='table'>
          <thead>
            <tr>
              <th>Título</th>
              <th>Motivo</th>
              <th>Cidade</th>
              <th>Status</th>
              <th>Publicar Anonimamente</th>
              <th>Termo de Aceite</th>
              <th>Criado em</th>
              <th>Expira em</th>
              <th>Associado</th>
            </tr>
          </thead>
          <tbody>
            {applyFilters(testemunhos).map((testemunho) => (
              <tr key={testemunho.id}>
                <td>{testemunho.titulo}</td>
                <td>{testemunho.motivo}</td>
                <td>{testemunho.cidade}</td>
                <td>{testemunho.status}</td>
                <td>{testemunho.publicar_anonimamente}</td>
                <td>{testemunho.termo_aceite}</td>
                <td>{testemunho.created_at}</td>
                <td>{testemunho.expira_em}</td>
                <td>{testemunho.associado?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaTest;
