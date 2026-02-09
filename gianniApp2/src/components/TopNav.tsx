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
    <nav className="top-nav" aria-label="Navigazione principale">
      <div className="top-nav__left">
        <Link
          to="/"
          className="top-nav__brand"
          aria-current={isHome ? "page" : undefined}
        >
          Gianni Web3 Market
        </Link>
      </div>

      <div className="top-nav__right">
        {rightSlot}

        {isConnected && address && (
          <div className="top-nav__wallet">
            <span className="top-nav__address" title={address}>
              {shortenAddress(address)}
            </span>

            <button
              type="button"
              className="top-nav__btn"
              onClick={() => disconnect()}
              aria-label="Disconnetti wallet"
            >
              Disconnetti
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
