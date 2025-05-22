import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import AboutPage from "./pages/AboutPage";
import RoomsPage from "./pages/RoomsPage";
import ManageRoom from "./pages/ManageRoom";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AddKosanPage from "./pages/AddKosanPage";
import EditKosanPage from "./pages/EditKosanPage";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route
          element={
            <ProtectedRoutes>
              <Homepage />
            </ProtectedRoutes>
          }
          path="/home"
        />
        {/* ABOUT */}
        <Route
          element={
            <ProtectedRoutes>
              <AboutPage />
            </ProtectedRoutes>
          }
          path="/about"
        />
        {/* ROOM */}
        <Route
          element={
            <ProtectedRoutes>
              <RoomsPage />
            </ProtectedRoutes>
          }
          path="/room"
        />
        {/* MANAGE ROOM */}
        <Route
          element={
            <ProtectedRoutes>
              <ManageRoom />
            </ProtectedRoutes>
          }
          path="/manage-room"
        />
        <Route
          element={
            <ProtectedRoutes>
              <AddKosanPage />
            </ProtectedRoutes>
          }
          path="/add-room"
        />
        <Route
          element={
            <ProtectedRoutes>
              <EditKosanPage />
            </ProtectedRoutes>
          }
          path="/edit-room/:id"
        />
        {/* NOT FOUND LINK */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

export default App;
