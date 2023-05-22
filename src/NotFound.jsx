import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function NotFound({ name }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/${name}/Home`);
    }, 4000);
  }, []);

  return <h1>Not Found 404</h1>;
}
