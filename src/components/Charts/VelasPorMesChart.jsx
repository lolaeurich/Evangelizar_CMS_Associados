import React, { useContext, useEffect, useState } from 'react';
import "./style.css"
import { Bar } from 'react-chartjs-2';
import { VelasContext } from '../Contexts/VelasContext';

const ChartVelasPorMes = () => {
  const { velas } = useContext(VelasContext); // Consumindo o contexto de Velas

  // Estado local para armazenar dados do gráfico por mês
  const [monthlyChartData, setMonthlyChartData] = useState({
    labels: [], // Rótulos para os meses
    datasets: [
      {
        label: 'Velas Adicionadas por Mês',
        data: [], // Dados inicialmente vazios
        backgroundColor: '#29482D', // Cor para as barras do gráfico
        stack: 'Stack 1', // Nome da pilha para o dataset
      },
    ],
  });

  // Função para contar quantas velas foram adicionadas por mês
  const countVelasPorMes = () => {
    // Mapeamento dos nomes dos meses abreviados
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr',
      'Mai', 'Jun', 'Jul', 'Ago',
      'Set', 'Out', 'Nov', 'Dez'
    ];

    // Objeto para armazenar a contagem de velas por mês
    const velasPorMes = {};

    // Processar cada vela e contar por mês
    velas.forEach(vela => {
      const createdAt = new Date(vela.created_at);
      const month = createdAt.getMonth(); // Retorna o mês (0-11)
      const monthLabel = months[month]; // Obtém o mês abreviado

      // Adicionar ao objeto de contagem de velas por mês
      if (!velasPorMes[monthLabel]) {
        velasPorMes[monthLabel] = 0;
      }
      velasPorMes[monthLabel]++;
    });

    // Montar os dados para o gráfico de velas por mês
    const labels = months;
    const dataPoints = months.map(month => velasPorMes[month] || 0);

    // Atualiza o estado do gráfico de velas por mês
    setMonthlyChartData({
      ...monthlyChartData,
      labels: labels,
      datasets: [
        {
          ...monthlyChartData.datasets[0],
          data: dataPoints,
        },
      ],
    });
  };

  // Carregar os dados de velas ao montar o componente
  useEffect(() => {
    countVelasPorMes();
  }, [velas]); // Atualiza sempre que velas mudar

  // Renderiza o componente Bar com os dados dinâmicos por mês
  return (
    <div className='velas-por-mes'>
      <h2 className='velas-por-mes-h2'>Velas Adicionadas por Mês</h2>
      <Bar className='bar-velas'
        data={{
          labels: monthlyChartData.labels,
          datasets: monthlyChartData.datasets.map(dataset => ({
            ...dataset,
            stack: 'Stack 1', // Define a pilha para todos os datasets
          })),
        }}
        options={{
          scales: {
            // xAxes: [{ stacked: true }], // Eixo x empilhado
            // yAxes: [{
            //   stacked: true, // Eixo y empilhado
            //   ticks: {
            //     min: 0,
            //     stepSize: 100,
            //     callback: function(value) {
            //       if (value === 0) return value;
            //       return value >= 1000 ? `${value / 1000}k` : value;
            //     }
            //   },
            // }],
          },
        }}
      />
    </div>
  );
};

export default ChartVelasPorMes;
