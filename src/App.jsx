import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Router from './components/router'
import Footer from './components/Footer'
function App() {
  let [showCart, setShowCart] = useState(false); // מצב להצגת סל קניות

  return (
    <>
      <NavBar />
      <Router />
      <Footer />
    </>
  )
}

export default App
