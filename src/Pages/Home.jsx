import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleExplore = () => {
    navigate(user ? "/watchlist" : "/login");
  };
  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero fade-in">
        <h1>🎬 MovieNest</h1>
        <p>Your personal movie watchlist made simple</p>

        <button onClick={handleExplore}>
          Explore
        </button>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How MovieNest Works</h2>

        <div className="steps">
          <div className="step">
            <span>📝</span>
            <h5>Create Account</h5>
            <p>Sign up and log in securely.</p>
          </div>

          <div className="step">
            <span>🎬</span>
            <h5>Explore Movies</h5>
            <p>Browse movies with ratings and details.</p>
          </div>

          <div className="step">
            <span>❤️</span>
            <h5>Save & Manage</h5>
            <p>Add, update or delete your watchlist.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <div className="features">
        <h2 className="slide-up">Why MovieNest?</h2>

        <div className="feature-grid">
          <div className="feature-card slide-up">
            <h3>🔐 Authentication</h3>
            <p>Secure login with role-based access</p>
          </div>

          <div className="feature-card slide-up">
            <h3>👑 Admin Control</h3>
            <p>Add, edit and manage movies</p>
          </div>

          <div className="feature-card slide-up">
            <h3>❤️ Favourites</h3>
            <p>Save movies you love</p>
          </div>

          <div className="feature-card slide-up">
            <h3>⭐ Rating</h3>
            <p>Rate movies easily</p>
          </div>

          <div className="feature-card slide-up">
            <h3>🔍 Search & Filter</h3>
            <p>Find movies instantly</p>
          </div>

          <div className="feature-card slide-up">
            <h3>🗑️ Trash System</h3>
            <p>Restore or delete movies</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-section">
            <h4>🎬 MovieNest</h4>
            <p>
              MovieNest is a personal movie watchlist application
              where users can explore, rate, and manage their
              favourite movies with ease.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li onClick={() => navigate("/register")}>Join Our Family</li>
              <li onClick={() => navigate("/watchlist")}>Watchlist</li>
              <li onClick={() => navigate("/login")}>Login</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Admin CRUD Operations</li>
              <li>User Favourites</li>
              <li>Rating System</li>
              <li>Trash Management</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Built With</h4>
            <p>⚛️ React</p>
            <p>🧠 Context API</p>
            <p>💾 LocalStorage</p>
            <p>🎨 CSS</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 MovieNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
