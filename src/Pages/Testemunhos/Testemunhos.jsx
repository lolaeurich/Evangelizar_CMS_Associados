import React, {useState, useEffect} from 'react';
import "../Velas/style.css"
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import TabelaVelas from "../../components/Tables/TableVelas";
import ChartComponentTest from "../../components/Charts/TestemunhosChart.jsx";
import CitiesDropdown from "../../components/Cities/CitiesDropdown"; // Importe o componente CitiesDropdown aqui
import TabelaTestemunhos from '../../components/Tables/TableTestemunhos.jsx';

function Testemunhos() {
    const [filtros, setFiltros] = useState([]);
    const [cidadeFiltro, setCidadeFiltro] = useState('');
    const [dadosTest, setDadosTest] = useState([]);

    // Simula a busca inicial dos dados na API
    useEffect(() => {
        async function fetchDadosTestemunhos() {
            try {
                const response = await fetch("https://arearestritaevangelizar.belogic.com.br/api/testemunho");
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados da API: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setDadosTestemunhos(data);
            } catch (error) {
                console.error('Erro na requisição:', error);
                // Aqui você pode definir como deseja tratar o erro (ex: exibir uma mensagem para o usuário)
            }
        }
        fetchDadosTestemunhos();
    }, []);

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
    
    const applyFilters = (data, filtros) => {
        return data.filter(item => {
            return filtros.every(filtro => {
                if (filtro.campo === 'cidade') {
                    return item.cidade.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.campo === 'status') {
                    return item.status.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.campo === 'motivo') {
                    return item.motivo.toLowerCase().includes(filtro.valor.toLowerCase());
                } else if (filtro.campo === 'periodoDe') {
                    if (!filtro.valor) return true; // Se não houver valor, não filtra por períodoDe
                    // Lógica para filtrar por períodoDe
                    return new Date(item.data) >= new Date(filtro.valor);
                } else if (filtro.campo === 'periodoAte') {
                    if (!filtro.valor) return true; // Se não houver valor, não filtra por períodoAte
                    // Lógica para filtrar por períodoAte
                    return new Date(item.data) <= new Date(filtro.valor);
                }
                return true; // Se não for um filtro específico, retorna true para não interferir na filtragem
            });
        });
    };

    // Filtra os dados com base nos filtros aplicados
    const dadosFiltrados = applyFilters(dadosTest, filtros);

    return (
        <div>
            <Nav />
            <div className="velas-container">

                <div className="container-de-graficos">

                    {/* PRIMEIRO GRÁFICO */}
                    <div className="velas-grafico-pizza">
                        <div className="filtro-grafico-pizza">
                            <div className="filtros-velas">
                                <div className='filtros'>
                                    <h2 className='velas-h2'>Status de Testemunhos</h2>
                                    <input
                                        style={{ height: "20px", width: "200px" }} // Ajuste a largura conforme necessário
                                        type="text"
                                        placeholder="Filtrar por título"
                                        onChange={(e) => handleFilterChange({ campo: 'titulo', valor: e.target.value })}
                                    />
                                    <select
                                        style={{ height: "25px", width: "120px" }} // Ajuste a largura conforme necessário
                                        onChange={(e) => handleFilterChange({ campo: 'status', valor: e.target.value })}
                                    >
                                        <option value="">Filtrar por status</option>
                                        <option value="ativo">Ativo</option>
                                        <option value="inativo">Inativo</option>
                                    </select>
                                    <select
                                        style={{ height: "25px", width: "150px" }} // Ajuste a largura conforme necessário
                                        onChange={(e) => handleFilterChange({ campo: 'motivo', valor: e.target.value })}
                                    >
                                        <option value="">Filtrar por motivo</option>
                                        <option value="doença">Doença</option>
                                        <option value="emprego">Emprego</option>
                                        <option value="família">Família</option>
                                        <option value="conflitos">Conflitos</option>
                                        <option value="finados">Finados</option>
                                        <option value="agradecimento">Agradecimento</option>
                                        <option value="gravidez">Gravidez</option>
                                    </select>
                                    <CitiesDropdown onSelectCity={handleCityFilterChange} />
                                    {/* <input
                                        type="date"
                                        style={{ height: "25px", width: "150px" }} // Ajuste a largura conforme necessário
                                        placeholder="De"
                                        onChange={(e) => handleFilterChange({ campo: 'periodoDe', valor: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        style={{ height: "25px", width: "150px" }} // Ajuste a largura conforme necessário
                                        placeholder="Até"
                                        onChange={(e) => handleFilterChange({ campo: 'periodoAte', valor: e.target.value })}
                                    /> */}
                                    <button onClick={clearFilters} style={{ height: "33px", border: "solid 1px #000", textAlign: "center" }}>Limpar Filtros</button>
                                </div>
                            </div>
                        </div>
                        <ChartComponentTest data={dadosFiltrados} />
                    </div>

                </div>

                {/* EXCEL */}
                <TabelaTestemunhos data={dadosFiltrados} />

            </div>
            <Rodape />
        </div>
    )
}

export default Testemunhos;
