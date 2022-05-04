import React from 'react'
import { createRoot } from "react-dom/client"

const Button = () => {
  return (
    <button className='btn'>I'm just a button</button>
  )
}


//Render the component
export const render = (elementId: string) => {
  console.log('elementId --> ', elementId)
  const container = document.getElementById(elementId)
  const root = createRoot(container!)
  root.render(<Button />)
}

window.renderButton = function (elementId: string) {
  // console.log('elementId --> ', elementId)
  // return (elementId) => render(elementId)
  render(elementId)
}

export default Button
