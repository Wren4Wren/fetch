import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [zooAnimal, setZooAnimal] = useState([]);
  const [anime, setAnime] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const rep = await fetch("https://ghibliapi.herokuapp.com/films");
        if (!rep.ok) {
          throw new Error(rep.statusText);
        }
        const data = await rep.json();
        setAnime(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError("No Anime for you");
      }
    };
    fetchMyData();
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://zoo-animal-api.herokuapp.com/animals/rand/10"
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setZooAnimal(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        setError("Couldn't fetch the data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Fetch API</h1>
      {error && <p>{error}</p>}
      {anime.map((anime) => (
        <div className="Movies" key={anime.id}>
          <h3>{anime.title}</h3>
          <img
            className="Banner Movie"
            src={anime.movie_banner}
            alt="movie banner"
          ></img>
          <img
            className="Ghibli Movie"
            src={anime.image}
            alt="Studio Ghibli Film"
          ></img>
          <p>{anime.description}</p>
        </div>
      ))}
      {zooAnimal.map((animal) => (
        <div key={animal.id}>
          <h3>{animal.name}</h3>
          <img
            className="Animal"
            src={animal.image_link}
            alt="An {animal.name}"
          ></img>
        </div>
      ))}
    </div>
  );
};

export default App;
