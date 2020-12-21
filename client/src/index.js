import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.querySelector('#root'))

serviceWorker.unregister()
