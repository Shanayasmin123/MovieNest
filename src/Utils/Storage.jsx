useEffect(() => {
  const loadFavs = () => {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const favMovies = movies.filter(
      movie => movie.favourite === true && !movie.isDeleted
    );
    setFavourites(favMovies);
  };

  loadFavs();

  window.addEventListener("storage", loadFavs);
  return () => window.removeEventListener("storage", loadFavs);
}, []);
