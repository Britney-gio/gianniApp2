import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";

type TopNavProps = {
  rightSlot?: ReactNode;
};

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export default function TopNav({ rightSlot }: TopNavProps) {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-slate-900/95 text-white shadow-md backdrop-blur border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm sm:text-base font-extrabold tracking-tight text-white hover:text-slate-100 transition"
            aria-current={isHome ? "page" : undefined}
          >
            Gianni Web3 Market
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {rightSlot}

          {isConnected && address && (
            <div className="flex items-center gap-3">
              <span
                className="rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm font-semibold text-slate-100"
                title={address}
              >
                {shortenAddress(address)}
              </span>

              <button
                type="button"
                onClick={() => disconnect()}
                aria-label="Disconnetti wallet"
                className="rounded-xl bg-white/10 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-white/15 transition btn-primary"
              >
                Esci
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
