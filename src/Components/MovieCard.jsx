import "./MovieCard.css";

const MovieCard = ({
  movie,
  role,
  onRate,
  onFavourite,
  onEdit,
  onDelete
}) => {
  return (
    <div className="movie-card">
      {/* 🎬 Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      {/* 🎞️ Details */}
      <h3>{movie.title}</h3>
      <p className="desc"><b>Genre:</b> {movie.genre}</p>
      <p className="desc"><b>Year:</b> {movie.year}</p>
      <p className="desc"><b>Duration:</b> {movie.duration}</p>
      <p className="desc">{movie.description}</p>

      {/* ⭐ USER ONLY */}
      {role === "user" && (
        <>
          <div className="rating">
            {[1,2,3,4,5].map(star => (
              <span
                key={star}
                onClick={() => onRate(movie.id, star)}
                style={{
                  cursor: "pointer",
                  color: star <= movie.rating ? "gold" : "gray"
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button onClick={() => onFavourite(movie.id)}>
            {movie.favourite ? "❤️ Favourite" : "🤍 Add to Favourite"}
          </button>
        </>
      )}

      {/* 👑 ADMIN ONLY – EDIT & DELETE */}
      {role === "admin" && (
        <div className="admin-actions">
          <button onClick={() => onEdit(movie.id)}>
            Edit
          </button>

          <button
            className="danger"
            onClick={() => onDelete(movie.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
