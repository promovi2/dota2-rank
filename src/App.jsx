import { useState, useEffect } from "react";
import Card from "./Card"; // Asegúrate de que este componente existe y recibe los datos correctamente.
import "./App.css";

const friendIds = [
  "56895105",
  "139182279",
  "122896024",
  "206634927",
  "114760690",
  "115438532",
  "116380909",
  "123368465",
  "291622474",
  "93215015"
  
];

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const responses = await Promise.all(
          friendIds.map(id =>
            fetch(`https://api.opendota.com/api/players/${id}`).then(res => res.json())
          )
        );
        console.log(responses);
  
        const sortedPlayers = responses
          .map(player => ({
            id: player.profile.account_id,
            avatarmedium: player.profile.avatarmedium,
            personaname: player.profile.personaname,
            rank_tier: player.rank_tier || 0 // Si no tiene ranking, se pone 0
          }))
          .sort((a, b) => b.rank_tier - a.rank_tier); // Ordenar de mayor a menor ranking
  
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
  
    fetchPlayers();
  }, []);
  

  if (!players.length) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {players.length === 0 ? (
        <p>Cargando jugadores...</p>
      ) : (
        players.map(player => (
          <Card
            key={player.id}
            avatarmedium={player.avatarmedium}
            personaname={player.personaname}
            rank_tier={player.rank_tier}
          />
        ))
      )}
    </>
  );
}

export default App;
