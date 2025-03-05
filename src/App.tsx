import { WagmiProvider } from "wagmi";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "./config/wagmi";

const client = new QueryClient();

function App() {
  return (
        <WagmiProvider config={wagmiConfig}>
       <QueryClientProvider client={client}>
        <RainbowKitProvider>
       <Router />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
