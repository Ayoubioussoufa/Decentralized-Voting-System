import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import KYCForm from './KycForm'
import Confirmation from './components/Confirmation';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<KYCForm/>} />
        <Route path='/confirmation' element={<Confirmation/>} />
      </Routes>
    </Router>
  )
}

export default App
