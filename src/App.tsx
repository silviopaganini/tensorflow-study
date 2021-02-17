import React, { useEffect, useState } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as knn from '@tensorflow-models/knn-classifier'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box } from 'theme-ui'
import Routes from './routes'
import { Nav } from './components'

const App = () => {
  const [modelMobilenet, setModelMobilenet] = useState<mobilenet.MobileNet>()
  const [modelKnn, setModelKnn] = useState<knn.KNNClassifier>()
  const [error, setError] = useState<boolean>(false)
  const loadModels = async () => {
    try {
      setModelMobilenet(await mobilenet.load())
      setModelKnn(await knn.create())
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  return (
    <Router>
      <Nav />
      {error ? (
        <Box p={3}>Error loading Model</Box>
      ) : (
        <>
          {modelMobilenet && modelKnn ? (
            <Switch>
              {Routes.map(({ exact, path, component: Component }, index) => (
                <Route exact={exact} key={index} path={path}>
                  <Component modelMobilenet={modelMobilenet} modelKnn={modelKnn} />
                </Route>
              ))}
            </Switch>
          ) : (
            <Box p={3}>Loading Models</Box>
          )}
        </>
      )}
    </Router>
  )
}

export default App
