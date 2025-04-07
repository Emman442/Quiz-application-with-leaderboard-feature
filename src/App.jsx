import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Protected from "./pages/Protected";
import Quiz from "./components/Quiz";
import Leaderboard from "./components/Leaderboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  createConfig,
  useAccount,
  useConnect,
  useBalance,
  http,
} from "wagmi";
import { embeddedWallet, userHasWallet } from "@civic/auth-web3";
import { CivicAuthProvider, UserButton, useUser } from "@civic/auth-web3/react";
import { mainnet, sepolia } from "wagmi/chains";
import { GatewayProvider } from "@civic/solana-gateway-react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";

import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";




const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [embeddedWallet()],
});

const queryClient = new QueryClient();

function WalletSection() {
  const userContext = useUser();
  const { connect, connectors } = useConnect();
  const { isConnected } = useAccount();
  const balance = useBalance({
    address: userHasWallet(userContext)
      ? userContext.walletAddress.toString()
      : undefined,
  });

  const connectExistingWallet = () =>
    connect({
      connector: connectors[0],
    });

  const createWallet = () => {
    if (userContext.user && !userHasWallet(userContext)) {
      return userContext.createWallet().then(connectExistingWallet);
    }
  };

  return (

    <>
      {userContext.user && (
        <div>
          {!userHasWallet(userContext) && (
            <p>
              <button onClick={createWallet}>Create Wallet</button>
            </p>
          )}
          {userHasWallet(userContext) && (
            <>
              <p>Wallet address: {userContext.walletAddress}</p>
              <p>
                Balance:{" "}
                {balance?.data
                  ? `${(
                      BigInt(balance.data.value) / BigInt(1e18)
                    ).toString()} ${balance.data.symbol}`
                  : "Loading..."}
              </p>
              {isConnected ? (
                <p>Wallet is connected</p>
              ) : (
                <button onClick={connectExistingWallet}>Connect Wallet</button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default function App() {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),

  ];
  const gatekeeperNetwork = new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6");
  const {wallet} = useWallet()

  return (
   <ConnectionProvider endpoint={endpoint}>
  <WalletProvider wallets={wallets} autoConnect>
    <GatewayProvider
      wallet={wallet} // ← ensure this comes from `useWallet()`
      gatekeeperNetwork={new PublicKey("ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6")}
      cluster="devnet"
      connection={new Connection(endpoint)}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <CivicAuthProvider clientId="fdb26ff7-d890-4fa2-bedb-773607398045">
            <WalletSection />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navigate to={"/quiz"} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<Navigate to="/login" />} />
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
                    fontFamily: "Quicksand",
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
    </GatewayProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}
