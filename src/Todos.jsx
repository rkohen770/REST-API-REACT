import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";

export function Todos({ name }) {
  // const { id} = useParams() ;
  return <h1>{`${name}`}`s Todos List:</h1>;
}
