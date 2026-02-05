import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import './Form.css';

/* 🎭 GENRE LIST */
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Fantasy",
  "Animation",
  "Crime",
  "Documentary"
];

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔁 FETCH MOVIE BY ID
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await API.get(`/movies/${id}`);
        const m = res.data;

        setTitle(m.title);
        setGenre(m.genre);
        setYear(m.year);
        setDuration(m.duration);
        setDescription(m.description);
        setPoster(m.poster);
      } catch (err) {
        console.error(err);
        alert("Movie not found");
        navigate("/watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  // 🔄 UPDATE MOVIE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !year || !duration || !description || !poster) {
      alert("All fields are required");
      return;
    }

    try {
      await API.patch(`/movies/${id}`, {
        title,
        genre,
        year,
        duration,
        description,
        poster
      });

      navigate("/watchlist");
    } catch (err) {
      console.error(err);
      alert("Failed to update movie");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      {/* 🔙 BACK BUTTON */}
<button
  className="circle-back-btn"
  onClick={() => navigate("/watchlist")}
  aria-label="Back"
>
  ←
</button>

      <h2>Edit Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 🎭 GENRE DROPDOWN */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="select-input"
        >
          <option value="">Select Genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          placeholder="Duration (e.g. 2h 30m)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          placeholder="Poster Image URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />

        <textarea
          className="desc"
          placeholder="Movie Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
