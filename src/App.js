import React from 'react'
import Header from './Components/Navbars/Header'
import Auth from './Components/Authentication/Auth'

const App = () => {
  return (
    <>
    <header>
      <Header/>
    </header>
    <main>
      <Auth/>
    </main>
    </>
  )
}

export default App
