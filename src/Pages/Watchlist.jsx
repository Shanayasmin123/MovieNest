import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Components/Navbar";
import "./Watchlist.css";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);

  // FETCH MOVIES FROM JSON SERVER
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await API.get("/movies");
      // show only non-deleted movies
      setMovies(res.data.filter((m) => !m.isDeleted));
    } catch (err) {
      console.error(err);
      alert("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);


  const toggleFavourite = async (movie) => {
  const userEmail = user.email;
  const favs = movie.favourites || [];

  const updatedFavs = favs.includes(userEmail)
    ? favs.filter(email => email !== userEmail)
    : [...favs, userEmail];

  await API.patch(`/movies/${movie.id}`, {
    favourites: updatedFavs
  });

  fetchMovies(); // refresh list
};
  // ⭐ USER – RATING
  const setRating = async (movie, rating) => {
    await API.patch(`/movies/${movie.id}`, { rating });
    fetchMovies();
  };

  // 🗑️ ADMIN – MOVE TO TRASH (SOFT DELETE)
  const deleteMovie = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await API.patch(`/movies/${id}`, { isDeleted: true });
    fetchMovies();
  };

  // 🔍 SEARCH + FILTER
  const filteredMovies = movies.filter((movie) => {
    const matchTitle = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchGenre =
      selectedGenre === "all" || movie.genre === selectedGenre;

    return matchTitle && matchGenre;
  });

  const genres = [
    "all",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  return (
    <>

      <div className="watchlist-container">
        {user?.role === "admin" && (
          <button
            className="add-btn"
            onClick={() => navigate("/add")}
          >
            + Add Movie
          </button>
        )}

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Loading movies...</p>
        ) : filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <div className="movie-list">
            {filteredMovies.map((movie) => (
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

                {user?.role === "user" && (
                  <>
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => setRating(movie, star)}
                          style={{
                            cursor: "pointer",
                            color:
                              star <= movie.rating
                                ? "gold"
                                : "gray",
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>

<button onClick={() => toggleFavourite(movie)}>
  {movie.favourites?.includes(user.email)
    ? "❤️ Favourite"
    : "🤍 Add to Favourite"}
</button>
                  </>
                )}

                {user?.role === "admin" && (
                  <div className="admin-actions">
                    <button
                      onClick={() =>
                        navigate(`/edit/${movie.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="danger"
                      onClick={() => deleteMovie(movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Watchlist;
