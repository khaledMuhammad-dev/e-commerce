import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <>
        <div>Cart</div>
        <Link to = "/">
            <small>&larr; Home Page</small>
        </Link>
    </>
  )
}
