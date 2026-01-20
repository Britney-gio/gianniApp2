import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1>Pagina non trovata</h1>
      <button
        className="alert-button"
        type="button"
        onClick={() => navigate("/")}
      >
        Home
      </button>
    </div>
  );
}
