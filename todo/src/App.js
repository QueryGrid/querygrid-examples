import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/home";
import Register from "./pages/register";
import Header from "./components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./pages/login";
import request from "./services/request";

const ProtectedRoute = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        request.auth.currentSignedInUser().then((response) => {
            setUser(response)
            setLoading(false)
        }).catch((err) => {
            setUser(err) // null
            setLoading(false)
        })
    }, [user])

    if (loading) return null
    return user ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
      <BrowserRouter>
          <Header />
        <Routes>
            <Route path="/" exact={true} element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
