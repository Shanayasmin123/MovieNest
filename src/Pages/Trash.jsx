import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Trash.css";

const Trash = () => {
  const navigate = useNavigate();
  const [trashMovies, setTrashMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    try {
      setLoading(true);
      const res = await API.get("/movies");
      setTrashMovies(res.data.filter((m) => m.isDeleted));
    } catch (err) {
      console.error(err);
      alert("Failed to load trash");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const restoreMovie = async (id) => {
    await API.patch(`/movies/${id}`, { isDeleted: false });
    fetchTrash();
  };

  const deleteForever = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    await API.delete(`/movies/${id}`);
    fetchTrash();
  };

  return (
    <>

      <div className="watchlist-container">
        <button
          className="btn"
          onClick={() => navigate("/watchlist")}
        >
          ⬅
        </button>

        <h2>🗑️ Trash</h2>

        {loading ? (
          <p>Loading...</p>
        ) : trashMovies.length === 0 ? (
          <p>No deleted movies</p>
        ) : (
          <div className="movie-list">
            {trashMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <h3>{movie.title}</h3>
                <p className="desc">{movie.description}</p>

                <div className="admin-actions">
                  <button
                    onClick={() => restoreMovie(movie.id)}
                  >
                    ♻️ Restore
                  </button>

                  <button
                    className="danger"
                    onClick={() => deleteForever(movie.id)}
                  >
                    ❌ Delete Forever
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Trash;
