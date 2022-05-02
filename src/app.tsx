import { FC } from 'react'
import Server from 'react-dom/server'

let App: FC = () => <h1>Building with esbuild</h1>
console.log(Server.renderToString(<App />))
