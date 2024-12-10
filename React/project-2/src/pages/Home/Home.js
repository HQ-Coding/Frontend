import { useFetch } from '../../hooks/useFetch'
import './Home.css'
import RecipeList from '../../component/RecipeList'

export default function Home() {

  const {data , isLoading, error} = useFetch('http://localhost:3000/recipes')
  
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isLoading && <p className='isLoading'>isLoading...</p>}

      {data &&  <RecipeList recipes={data}/> }
    </div>
  )
}
