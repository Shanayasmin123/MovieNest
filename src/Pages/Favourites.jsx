import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../Context/AuthContext";
import "./Watchlist.css";

const Favourites = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      const res = await API.get("/movies");

      const favMovies = res.data.filter(
        movie =>
          movie.favourites?.includes(user.email) &&
          !movie.isDeleted
      );

      setFavourites(favMovies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ REMOVE FROM FAVOURITES
  const removeFromFavourite = async (movie) => {
    const updatedFavs = movie.favourites.filter(
      email => email !== user.email
    );

    await API.patch(`/movies/${movie.id}`, {
      favourites: updatedFavs
    });

    fetchFavourites(); // refresh list
  };

  useEffect(() => {
    if (user?.email) {
      fetchFavourites();
    }
  }, [user?.email]);

  return (
    <div className="watchlist-container">
      {/* 🔙 BACK */}
      <button className="back-btn" onClick={() => navigate("/watchlist")}>
        ←
      </button>

      <h2>❤️ Your Favourites</h2>

      {loading ? (
        <p>Loading favourites...</p>
      ) : favourites.length === 0 ? (
        <p>No favourite movies yet</p>
      ) : (
        <div className="movie-list">
          {favourites.map(movie => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.poster}
                alt={movie.title}
                className="movie-poster"
              />

              <h3>{movie.title}</h3>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Duration:</strong> {movie.duration}</p>
              <p className="desc">{movie.description}</p>

              {/* ❌ REMOVE BUTTON */}
              <button
                className="remove-fav-btn"
                onClick={() => removeFromFavourite(movie)}
              >
                ❌ Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
