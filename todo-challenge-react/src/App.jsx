import { useState } from 'react'
import './App.css'
import StoreProvider from './store/StoreProvider'
import MainForm from './components/MainForm'
import CategoryForm from './components/CategoryForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <StoreProvider>
        <MainForm/>
        <CategoryForm/>

      </StoreProvider>
    </div>
    )
}

export default App
