const express = require('express')
const React = require('react')
const ReactDOM = require('react-dom/server')
const History = require('history')
const Router = require('mobx-little-router')
const App = require('./src/App')
const routes = require('./src/routes')
const DataStore = require('./src/DataStore')

const app = express()

app.get('*', function(req, res) {
  const dataStore = new DataStore()
  const router = Router.install({
    createHistory: [History.createMemoryHistory, { initialEntries: [req.url] }],
    routes: routes,
    getContext: () => ({
      dataStore: dataStore
    })
  })

  router.start(() => {
    const html = ReactDOM.renderToString(
      React.createElement(App, { dataStore: dataStore, router: router })
    )

    res.send(html)
  })
})

app.listen(3000, function() {
  console.log('SSR example listening on port 3000!')
})