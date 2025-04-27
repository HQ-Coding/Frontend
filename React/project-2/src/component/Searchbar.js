import { useNavigate } from 'react-router-dom';
import './Searchbar.css'
import { useState } from 'react';

export default function Searchbar() {

  const [term, setTerm] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate(`/search?q=${term}`)
  }

  return (
    <div className='searchbar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor=""> Search:</label>
          <input 
          id='Search'
          type='text'
          onChange={(e) => setTerm(e.target.value)}
          required
          />
        
      </form>
    </div>
  )
}
 