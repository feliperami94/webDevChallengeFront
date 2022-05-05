import { useState } from 'react'
import './App.css'
import StoreProvider from './components/StoreProvider'
import MainForm from './components/MainForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <StoreProvider>
        <MainForm>


        </MainForm>
      </StoreProvider>
    </div>
    )
}

export default App
