import React, { FC } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from '../button'
import { Partial } from "./parts"

const Gallery: FC = () => {
  return (
    <div>
      This is a component with a child
      <Partial />
      <Button />
    </div>
  )
}

//Render the component
export const render = (elementId: string) => {
  console.log('elementId --> ', elementId)
  const container = document.getElementById(elementId)
  const root = createRoot(container!)
  root.render(<Gallery />)
}

window.renderGallery = function (elementId: string) {
  // console.log('elementId --> ', elementId)
  // return (elementId) => render(elementId)
  render(elementId)
}

export default Gallery
