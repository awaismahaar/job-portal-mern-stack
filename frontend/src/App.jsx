import { Outlet } from 'react-router-dom';
import './App.css'
import { Toaster } from "./components/ui/sonner"
function App() {
  return (
    <>
     <Toaster />
     <Outlet/>
    </>
  )
}

export default App
