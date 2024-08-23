import axios from 'axios'
import './App.css'
import Registration from './components/Registration/Registration'

function App() {
  axios.defaults.baseURL = 'http://localhost:3030';
  axios.defaults.withCredentials = true

  return (
    <>
      <Registration />
    </>
  )
}

export default App
