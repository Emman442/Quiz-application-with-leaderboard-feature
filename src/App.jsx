
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Protected from "./pages/Protected";
import Quiz from './components/Quiz'
import Leaderboard from "./components/Leaderboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, useAccount, useConnect, useBalance, http } from 'wagmi';
import { embeddedWallet, userHasWallet } from '@civic/auth-web3';
import { CivicAuthProvider, UserButton, useUser } from '@civic/auth-web3/react';
import { mainnet, sepolia } from "wagmi/chains";

const wagmiConfig = createConfig({
  chains: [ mainnet, sepolia ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    embeddedWallet(),
  ],
});


export default function App() {
  const queryClient = new QueryClient();
  const user = useUser(); 
  console.log("userrrr: ",user)
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
    <CivicAuthProvider clientId="fdb26ff7-d890-4fa2-bedb-773607398045">
    <BrowserRouter>
    
      {/* {children} */}
      <Routes>
      <Route path="/" element={<Navigate to={user ? "/quiz" : "/login"} />} />
      <Route path="/login" element={user ? <Navigate to="/quiz" /> : <Login />} />
        
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
   </CivicAuthProvider>
   </WagmiProvider>
    </QueryClientProvider>
  );
}
