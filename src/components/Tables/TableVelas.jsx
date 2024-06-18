import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import XLSX from 'xlsx/dist/xlsx.full.min.js';
import CitiesDropdown from '../Cities/CitiesDropdown';

const TabelaVelas = () => {
  const [velas, setVelas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtros, setFiltros] = useState([]);
  const [cidadeFiltro, setCidadeFiltro] = useState('');

  useEffect(() => {
    fetchVelasData();
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
      <h2 className='tabela-velas-h2'>Lista de Velas</h2>
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
      <button className='export-button' onClick={exportToExcel}>
        Exportar para Excel
      </button>
    </div>
  );
};

export default TabelaVelas;
