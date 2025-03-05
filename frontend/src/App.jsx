import Menu from './components/menu'
import Login from './route/login'
import Logout from './route/logout'
import Register from './route/register'
import Protected from './components/protected'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthProvider } from './context/useAuth.jsx'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Protected><Menu/></Protected>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/logout' element={<Protected><Logout/></Protected>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
)
}

export default App
