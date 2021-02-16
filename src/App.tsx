import React, { useEffect, useState } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box } from 'theme-ui'
import Routes from './routes'
import { Nav } from './components'

const App = () => {
  const [model, setModel] = useState<mobilenet.MobileNet>()
  const [error, setError] = useState<boolean>(false)
  const loadModel = async () => {
    try {
      setModel(await mobilenet.load())
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }

  useEffect(() => {
    loadModel()
  }, [])

  return (
    <Router>
      <Nav />
      {error ? (
        <Box p={3}>Error loading Model</Box>
      ) : (
        <>
          {model ? (
            <Switch>
              {Routes.map(({ path, component: Component }, index) => (
                <Route key={index} path={path.replace('.', '')}>
                  <Component model={model} />
                </Route>
              ))}
            </Switch>
          ) : (
            <Box p={3}>Loading Model</Box>
          )}
        </>
      )}
    </Router>
  )
}

export default App
