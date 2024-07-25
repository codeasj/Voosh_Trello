import { createContext, useContext } from "react";
import Button from "./Button";
import api, { authApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ProtectedRoute";
import toast from "react-hot-toast";
const AuthContext = createContext();

export default function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("user");
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header>
      <nav className="flex items-center h-12 w-full px-2 justify-between bg-blue-500">
        <div>Image</div>

        {isAuthenticated ? (
          <Button className="bg-red-500 border-none" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}
