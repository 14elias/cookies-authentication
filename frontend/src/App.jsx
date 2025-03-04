import Home from './home'
import Login from './route/login'
import Logout from './route/logout'
import Register from './route/register'
import Protected from './components/protected'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected><Home/></Protected>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Protected><Logout/></Protected>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
)
}

export default App
