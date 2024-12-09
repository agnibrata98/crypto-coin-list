import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CryptoTable from './cryptoCurrency/CryptoTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CryptoTable/>
    </>
  )
}

export default App
