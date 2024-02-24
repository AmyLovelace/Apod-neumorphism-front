import React from 'react'
import ReactDOM from 'react-dom/client'
import ApodComponent from '../src/components/ApodComponent'
import Title from '../src/components/Title'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Title/>
    <ApodComponent />
  </React.StrictMode>,
)
