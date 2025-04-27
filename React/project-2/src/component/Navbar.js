import { Link } from 'react-router-dom'
import './Navbar.css'
import Searchbar from './Searchbar'

export default function navbar() {
  return (
    <div className='navbar'>
        <nav>
            <Link to='/' className='brand' >
                <h1>HQ Food</h1>
            </Link>
            <Searchbar />
            <Link to='/create' >
                <h1>Create Recipe</h1>
            </Link>
        </nav>
    </div>
  )
}
