import { useNavigate } from "react-router-dom";

export default function RedirectButton({ to, text }) {
  const navigate = useNavigate();

  return (
    <div className="p-2">
      <button
        onClick={() => navigate(to)}
        className="bg-primary"
      >
        {text}
      </button>
    </div>
  );
}