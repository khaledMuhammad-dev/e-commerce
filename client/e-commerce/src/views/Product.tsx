import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();

  return (
    <>
        <div>product id</div>
        <Link to = "/">
            <small>&larr; Home Page</small>
        </Link>
    </>
  )
}
