import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from "./pages/home";
import Realtime from "./pages/realtime";
import Upload from "./pages/upload";
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
            console.log(response)
            setUser(response)
            setLoading(false)
        }).catch((err) => {
            setUser(err) // null
            setLoading(false)
        })
    }, [])

    if (loading) return null
    return user ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
      <BrowserRouter>
          <Header />
        <Routes>
            <Route path="/" exact={true} element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/realtime" exact={true} element={<ProtectedRoute><Realtime /></ProtectedRoute>} />
            <Route path="/upload" exact={true} element={<Upload />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
