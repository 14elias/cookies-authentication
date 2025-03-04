import Home from './home'
import Login from './route/login'
import Logout from './route/logout'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} />
      </Routes>
    </BrowserRouter>
)
}

export default App
