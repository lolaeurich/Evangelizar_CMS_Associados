import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import CitiesDropdown from '../Cities/CitiesDropdown';

const TabelaTestemunhos = () => {
  const [testemunhos, setTestemunhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState([]);
  const [cidadeFiltro, setCidadeFiltro] = useState('');

  useEffect(() => {
    fetchTestemunhosData();
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
      console.error('Erro ao buscar dados de velas:', error);
      setLoading(false);
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

  const clearFilters = () => {
    setFiltros([]);
    setCidadeFiltro('');
  };

  const applyFilters = (data) => {
    return data.filter(item => {
      return filtros.every(filtro => {
        if (filtro.campo === 'cidade') {
          return item.cidade.toLowerCase().includes(filtro.valor.toLowerCase());
        }
        return item[filtro.campo].toLowerCase().includes(filtro.valor.toLowerCase());
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
      <h2 className='tabela-velas-h2'>Lista de Testemunhos</h2>
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
      <button className='export-button' onClick={exportToExcel}>
        Exportar para Excel
      </button>
    </div>
  );
};

export default TabelaTestemunhos;
