import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {

  console.log("Navbar Cargado");

  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container">

        
        <Link to="/" className="navbar-brand fw-bold">
          Los Simpsons
        </Link>

        
        <div className="dropdown">

          <button
            className="btn btn-warning dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
			Favorites
             
            <span className="badge bg-dark ms-1">
              {store.favorites?.length || 0}
            </span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end p-2">

            {store.favorites?.length === 0 ? (

              <li className="text-muted px-2">
                No hay favoritos
              </li>

            ) : (

              store.favorites?.map((item, index) => (

                <li
                  key={index}
                  className="d-flex justify-content-between align-items-center px-2"
                >
                  <span>{item}</span>

                  <i
                    className="fa-solid fa-trash text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      dispatch({
                        type: "remove_favorite",
                        payload: item
                      })
                    }
                  ></i>
                </li>

              ))

            )}

          </ul>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
