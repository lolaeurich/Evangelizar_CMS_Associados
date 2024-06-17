import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const VelasContext = createContext({
  velas: [],
  setVelas: () => {}, // Incluindo setVelas no contexto
  inserirVela: () => {},
  editarVela: () => {},
  excluirVela: () => {},
});

export const VelasProvider = ({ children }) => {
  const [velas, setVelas] = useState([]);

  useEffect(() => {
    fetchVelas();
  }, []);

  const fetchVelas = async () => {
    try {
      const { data } = await axios.get(
        "https://arearestritaevangelizar.belogic.com.br/api/vela",
        {
          headers: {
            authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTE5MjE3YzgxNWU4OTc2Y2FmMGRkZGE4Y2EyYTFlYmI0NGJlOGI4NDUzMTE5Mzg1ZGI0M2M2YmFmNzliYjliZTY1MGVjZDZkNmNkNGRiZDUiLCJpYXQiOjE3MTgxMTA1OTIuMDAxMDQsIm5iZiI6MTcxODExMDU5Mi4wMDEwNDIsImV4cCI6MTc0OTY0NjU5MS45OTc4NDcsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.WfLku-xGv1WdP88cqoZ-MVsGemHTroAyHc3y4XZYzi4_KmaVuKpkAkNOmpxWKRa4gvb-DgtsIHvKzIPNPCx-NO_EnIjom01JIISBXbBaRquRfC0AFpDU5lFsSuiXYcVa8RS_FmDTcUL903_B4nNsN6Tj3CQyQicQ32Kv181KOyLntakxL2Yuxje96-JwQAvBYr55cNPUHG9Dwcb6-tj6brxsCEa_X4L7zm1mJMt4k5NCaEu-RW6c9Yv5eUn50HFlFZ5kuSoiGk363J_eKG58_3LiKB1u5VsaTjWG7K2GoEJvG8-wTn3u0_D7j7eaXWFoxg-Aovaj_f8dW7QoLhU3tISFmhkyOLXRIrjVcr-6LM2vyrLo9igVhe9qZXfUgHkfji2tjpex3pA8dinrgZryWvDE-pbLy33e-OFJBvaeHRty9LG7VeRTszC2s2Rd5UJwKsNX0BWeo5ndXt8jqhuG8SlGUxiHy2x_iReA-3Ux0seqwnpAgdc2NZRdZ-mKIIlBBeUzyIPbf2dixzHTJOkkzlbhEoT9jnbZuO3U3SZcZfOLhy6jZovuE_Tb3kaGXR1Aca-CbCrZ46_KhplYpe1AIhOeoxvPiUHRChCs7j5hCx8yLzxWzYA8bmVHI0dXZ_Ca3056PTfPfXer13y6yjYbt6W6WvHCwgbApg5b5-5nNXc"
          },
        }
      );
      setVelas(data.data);
    } catch (error) {
      console.error("Erro ao buscar dados de velas:", error);
    }
  };

  const inserirVela = async (vela) => {
    try {
      const { data } = await axios.post(
        "https://arearestritaevangelizar.belogic.com.br/api/vela",
        vela,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchVelas();
    } catch (error) {
      console.error("Erro ao inserir vela:", error);
    }
  };

  const editarVela = async (vela) => {
    try {
      const { data } = await axios.put(
        `https://arearestritaevangelizar.belogic.com.br/api/vela/${vela.id}`,
        vela,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchVelas();
    } catch (error) {
      console.error("Erro ao editar vela:", error);
    }
  };

  const excluirVela = async (id) => {
    try {
      await axios.delete(`https://arearestritaevangelizar.belogic.com.br/api/vela/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchVelas();
    } catch (error) {
      console.error("Erro ao excluir vela:", error);
    }
  };

  const value = {
    velas,
    setVelas, // Incluindo setVelas no objeto de valor do contexto
    inserirVela,
    editarVela,
    excluirVela,
  };

  return (
    <VelasContext.Provider value={value}>
      {children}
    </VelasContext.Provider>
  );
};
