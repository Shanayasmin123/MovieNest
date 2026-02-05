import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Watchlist from "./Pages/Watchlist";
import AddMovie from "./Pages/AddMovie";
import EditMovie from "./Pages/EditMovie";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import Trash from "./Pages/Trash";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Favourites from "./Pages/Favourites";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED */}
        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          }
        />

<Route
  path="/fav"
  element={
    <ProtectedRoute>
      <Favourites />
    </ProtectedRoute>
  }
/>


        <Route
          path="/add"
          element={
            <AdminRoute>
              <AddMovie />
            </AdminRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <AdminRoute>
              <EditMovie />
            </AdminRoute>
          }
        />

        <Route
          path="/trash"
          element={
            <AdminRoute>
              <Trash />
            </AdminRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
