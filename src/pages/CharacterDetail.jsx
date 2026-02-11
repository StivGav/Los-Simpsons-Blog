import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CharacterDetail = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState(null);

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://thesimpsonsapi.com/api/characters")
      .then((resp) => resp.json())
      .then((data) => {
        const found = data.results.find((item) => item.id === parseInt(id));

        setCharacter(found);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!character) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          <img
            src={`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`}
            alt={character.name}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-8">
          <h2 className="mb-3">{character.name}</h2>

          <p>
            <strong>Edad:</strong> {character.age || "N/A"}
          </p>

          <p>
            <strong>Género:</strong> {character.gender}
          </p>

          <p>
            <strong>Ocupación:</strong> {character.occupation}
          </p>

          <p>
            <strong>Estado:</strong> {character.status}
          </p>

          <p>
            <strong>Fecha nacimiento:</strong> {character.birthdate || "N/A"}
          </p>

          <h5 className="mt-4">Frases famosas</h5>

          <ul>
            {character.phrases.map((phrase, index) => (
              <li key={index}>{phrase}</li>
            ))}
          </ul>

          <div className="mt-4 d-flex gap-3">
            <Link to="/">
              <button className="btn btn-secondary">Volver</button>
            </Link>

            <button
              className="btn btn-outline-danger"
              onClick={() =>
                dispatch({
                  type: "add_favorite",
                  payload: character.name,
                })
              }
            >
              <i
                className={
                  store.favorites.includes(character.name)
                    ? "fa-solid fa-heart text-danger"
                    : "fa-regular fa-heart"
                }
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
