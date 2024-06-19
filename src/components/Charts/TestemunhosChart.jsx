import React, { useContext, useEffect, useState } from 'react';
import "./style.css"
import { Pie } from 'react-chartjs-2';
import { TestemunhosContext } from "../Contexts/TestemunhosContext.jsx"

const ChartComponentTest = () => {
  const { testemunhos } = useContext(TestemunhosContext); // Consumindo o contexto de Velas

  // Estado local para armazenar dados do gráfico
  const [chartData, setChartData] = useState({
    labels: ['Testemunho ativo', 'Testemunho inativo'], // Rótulos para as fatias da pizza
    datasets: [
      {
        label: 'Número de Testemunhos',
        data: [0, 0], // Dados inicialmente vazios
        backgroundColor: ['#29482D', '#DDA63A'], // Cores para as fatias
        hoverBackgroundColor: ['#FF5A5E', '#DDA63A'], // Cores ao passar o mouse
      },
    ],
    options: {
      plugins: {
        legend: {
          position: 'right', // Posiciona as legendas à direita do gráfico
          labels: {
            boxWidth: 20, // Largura das caixas das legendas
          },
        },
      },
    },
  });

  // Função para buscar e atualizar os dados de velas
  const fetchTestemunhosData = async () => {
    try {
      // Fazer requisição à API para buscar os dados de velas
      const response = await fetch('https://arearestritaevangelizar.belogic.com.br/api/testemunho', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados de velas');
      }

      const data = await response.json();

      console.log('Dados recebidos da API:', data); // Verifique os dados recebidos

      // Verificar se data é uma array antes de filtrar
      if (!Array.isArray(data.data)) {
        throw new Error('Os dados recebidos não são uma array');
      }

      // Contagem de velas com e sem vela
      const comTestemunho = data.data.filter(testemunho => testemunho.anonimo === true).length;
      const semTestemunho = data.data.length - comTestemunho;

      // Atualiza o estado do gráfico com os novos dados
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: [comTestemunho, semTestemunho], // Atualiza os dados das fatias da pizza
          },
        ],
      });
    } catch (error) {
      console.error('Erro ao buscar dados de testemunhos:', error);
      // Trate o erro conforme necessário (ex.: exibir mensagem de erro)
    }
  };

  // Carrega os dados de velas ao montar o componente
  useEffect(() => {
    fetchTestemunhosData();
  }, []); // Executa apenas uma vez ao montar o componente

  // Renderiza o componente Pie com os dados dinâmicos
  return (
    <div className='status-velas'>
      <h2 className='status-velas-h2'>Status de Testemunhos</h2>
      <Pie data={chartData} options={chartData.options} />
    </div>
  );
};

export default ChartComponentTest;