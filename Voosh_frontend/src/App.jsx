import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ProtectedRoute, { AuthProvider } from "./components/ProtectedRoute";
export default function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <ProtectedRoute path="/home" element={<Home />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
