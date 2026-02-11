import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const Home = () => {

  const [personajes, setPersonajes] = useState([]);

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {

    fetch("https://thesimpsonsapi.com/api/characters")
      .then(resp => resp.json())
      .then(data => {
        setPersonajes(data.results);
      })
      .catch(error => console.log(error));

  }, []);


  const dividirEnGrupos = (array, size) => {
    const grupos = [];

    for (let i = 0; i < array.length; i += size) {
      grupos.push(array.slice(i, i + size));
    }

    return grupos;
  };


  const grupos = dividirEnGrupos(personajes, 3);


  return (
    <div className="container mt-4">

      <h1 className="text-primary mb-4 text-center">
        Los Simpsons
      </h1>


      <div
        id="simpsonsCarousel"
        className="carousel slide carousel-dark"
        data-bs-ride="carousel"
      >

        <div className="carousel-inner">

          {grupos.map((grupo, index) => (

            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >

              <div className="row justify-content-center">

                {grupo.map((p, i) => (

                  <div key={i} className="col-md-4 mb-3">

                    <div className="card shadow h-100">

                      <img
                        src={`https://cdn.thesimpsonsapi.com/500${p.portrait_path}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{
                          height: "220px",
                          objectFit: "cover"
                        }}
                      />


                      <div className="card-body text-center">

                        <h5 className="card-title">
                          {p.name}
                        </h5>

                        <p className="card-text mb-1">
                          <strong>Edad:</strong> {p.age || "Desconocida"}
                        </p>

                        <p className="card-text mb-2">
                          <strong>Ocupación:</strong> {p.occupation || "N/A"}
                        </p>


                        <div className="d-flex justify-content-between align-items-center">
                          <Link to={`/character/${p.id}`}>
                          <button className="btn btn-primary btn-sm">
                            Learn more
                          </button>
                          </Link>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              dispatch({
                                type: "add_favorite",
                                payload: p.name
                              })
                            }
                          >

                            <i
                              className={
                                store.favorites.includes(p.name)
                                  ? "fa-solid fa-heart text-danger"
                                  : "fa-regular fa-heart"
                              }
                            ></i>

                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>


        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#simpsonsCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>


        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#simpsonsCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>

    </div>
  );
};

export default Home;
