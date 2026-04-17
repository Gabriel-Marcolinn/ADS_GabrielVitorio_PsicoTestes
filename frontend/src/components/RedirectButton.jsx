import { useNavigate } from "react-router-dom"

export default function RedirectButton({ to, text }) {
    const navigate = useNavigate();

    return(
        <button onClick={() => navigate(to)}>
            { text }
        </button>
    )
}