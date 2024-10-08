
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Protected from "./pages/Protected";
import Quiz from './components/Quiz'
import Leaderboard from "./components/Leaderboard";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}/>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="*" element={<Navigate to="/login" />}/>
        <Route
          path="/quiz"
          element={
            <Protected>
              <Quiz />
            </Protected>
          }
        />
   
      </Routes>
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "24px" }}
        toastOptions={{
          success: {
            duration: 6000,
            style: {
              border: "1.5px solid #38BB5C",
            },
          },
          error: {
            duration: 7000,
            style: {
              border: "1.5px solid #FC6161",
            },
          },
          style: {
            fontFamily: "Ouicksand",
            fontWeight: "400",
            fontSize: "18px",
            maxWidth: "460px",
            padding: "12px 16px",
            backgroundColor: "#F2FFF5",
            color: "#666",
          },
        }}
      />
    </BrowserRouter>
  );
}
