import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import CitiesDropdown from '../Cities/CitiesDropdown';

const TabelaVelas = () => {
  const [velas, setVelas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState([]);
  const [cidadeFiltro, setCidadeFiltro] = useState('');
  const [motivos, setMotivos] = useState([]);
  const [filtroMotivo, setFiltroMotivo] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  useEffect(() => {
    fetchVelasData();
    fetchMotivos();
  }, []);

  const fetchVelasData = async () => {
    try {
      const response = await axios.get('https://arearestritaevangelizar.belogic.com.br/api/vela', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.data.data || !Array.isArray(response.data.data)) {
        throw new Error('Dados inválidos recebidos da API');
      }

      setVelas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados de velas:', error);
      setLoading(false);
    }
  };

  const fetchMotivos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://arearestritaevangelizar.belogic.com.br/api/vela/motivos', {
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
        if (filtro.campo === 'cidade') {
          return item.cidade.toLowerCase().includes(filtro.valor.toLowerCase());
        } else if (filtro.campo === 'motivo') {
          return item.motivo.toLowerCase() === filtro.valor.toLowerCase();
        } else if (filtro.campo === 'titulo') {
          return item.titulo.toLowerCase().includes(filtro.valor.toLowerCase());
        }
        return item[filtro.campo].toLowerCase().includes(filtro.valor.toLowerCase());
      });
    });
  };

  const exportToExcel = () => {
    const dadosExportar = filtros.length > 0 ? applyFilters(velas) : velas;
    const worksheet = XLSX.utils.json_to_sheet(dadosExportar);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Velas');
    const excelFileName = 'velas.xlsx';
    XLSX.writeFile(workbook, excelFileName);
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  return (
    <div className='velas-excel'>
      <div className='nav-table'>
        <h2 className='tabela-velas-h2'>Lista de Velas</h2>
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
          <CitiesDropdown onSelectCity={handleCityFilterChange} />
          <button className='limpar-filtros' onClick={clearFilters} style={{ height: "33px", border: "solid 1px #000", textAlign: "center" }}>Limpar Filtros</button>
        </div>
        <button className='export-button' onClick={exportToExcel}>
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
            {applyFilters(velas).map((vela) => (
              <tr key={vela.id}>
                <td>{vela.titulo}</td>
                <td>{vela.motivo}</td>
                <td>{vela.cidade}</td>
                <td>{vela.status}</td>
                <td>{vela.publicar_anonimamente}</td>
                <td>{vela.termo_aceite}</td>
                <td>{vela.created_at}</td>
                <td>{vela.expira_em}</td>
                <td>{vela.associado?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaVelas;
