import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi";

export const config = createConfig({
  connectors: [injected()],
  chains: [sepolia],
  transports: { [sepolia.id]: http() },
});
