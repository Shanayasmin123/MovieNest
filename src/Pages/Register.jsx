// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import './Auth.css'


// const Register = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const newErrors = {};

//     if (!username.trim()) {
//       newErrors.username = "Username is required";
//     }

//     if (!email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!email.endsWith("@gmail.com")) {
//       newErrors.email = "Only Gmail allowed";
//     }

//     if (!password.trim()) {
//       newErrors.password = "Password is required";
//     } else if (password.length < 6) {
//       newErrors.password = "Minimum 6 characters";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     const userData = {
//       username,
//       email,
//       password
//     };

//     localStorage.setItem("registeredUser", JSON.stringify(userData));

//     alert("Registration successful!");
//     navigate("/");
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit} autoComplete="off">
//         <input
//           type="text"
//           name="username"
//           autoComplete="off"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         {errors.username && <p className="error">{errors.username}</p>}

//         <input
//           type="email"
//           name="email"
//           autoComplete="off"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {errors.email && <p className="error">{errors.email}</p>}

//         <input
//           type="password"
//           name="password"
//           autoComplete="new-password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {errors.password && <p className="error">{errors.password}</p>}

//         <button type="submit">Register</button>
//       </form>

//       <p>
//         Already have an account? <Link to="/login" className="auth-link">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;





import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.endsWith("@gmail.com")) {
      newErrors.email = "Only Gmail allowed";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // ✅ GET EXISTING USERS
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ❌ CHECK DUPLICATE EMAIL
    const alreadyExists = users.find(
      (u) => u.email === email
    );

    if (alreadyExists) {
      alert("User already registered. Please login.");
      return;
    }

    // ✅ ADD NEW USER
    users.push({
      username,
      email,
      password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Fake inputs to reduce autofill */}
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <input type="password" name="fakepass" style={{ display: "none" }} />

        <input
          type="text"
          name="username"
          autoComplete="off"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
