import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitiesDropdown = ({ onSelectCity }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');

        if (response.data && Array.isArray(response.data)) {
          setCities(response.data.map(city => ({ id: city.id, nome: city.nome })));
        }
      } catch (error) {
        console.error('Erro ao buscar cidades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return <select disabled><option>Carregando...</option></select>;
  }

  return (
    <select onChange={(e) => onSelectCity(e.target.value)}>
      <option value="">Selecione uma cidade</option>
      {cities.map(city => (
        <option key={city.id} value={city.nome} style={{height: "50px"}}>{city.nome}</option>
      ))}
    </select>
  );
};

export default CitiesDropdown;
