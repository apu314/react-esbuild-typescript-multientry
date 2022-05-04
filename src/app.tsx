import { FC } from 'react'
import Server from 'react-dom/server'

const App: FC = () => {
  return (
    <h1>Building with esbuild</h1>
  )
}
console.log(Server.renderToString(<App />))

export default App
