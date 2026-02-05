import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Form.css";

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

const AddMovie = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genre || !year || !duration || !description || !poster) {
      alert("All fields are required");
      return;
    }

    const newMovie = {
      title,
      genre,
      year,
      duration,
      description,
      poster,
      rating: 0,
      favourite: false,
      isDeleted: false
    };

    try {
      setLoading(true);
      await API.post("/movies", newMovie);   // JSON SERVER CREATE
      navigate("/watchlist");
    } catch (err) {
      alert("Failed to add movie");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <button
        className="back-btn"
        onClick={() => navigate("/watchlist")}
      >
        ⬅
      </button>

      <h2>Add Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
