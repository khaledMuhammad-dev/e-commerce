import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
        <div>Home</div>
        <ul>
          <li>
            <Link to = "/product/1">
                <small>Product Page &rarr;</small>
            </Link>
          </li>
          
          <li>
            <Link to = "/results">
                <small>Search results page &rarr;</small>
            </Link>
          </li>
          
          <li>
            <Link to = "/categories">
                <small>Categories Page &rarr;</small>
            </Link>
          </li>
          
          <li>
            <Link to = "/cart">
                <small>Cart &rarr;</small>
            </Link>
          </li>
        </ul>
    </>
  )
}
