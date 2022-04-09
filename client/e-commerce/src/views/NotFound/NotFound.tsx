import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const { not_found } = styles;

  return (
    <div className={ not_found }>
        <p>
          404 | Page is not found <br />
          <Link to = "/">
              <small>&larr; Home Page</small>
          </Link>
        </p>
    </div>
  )
}
