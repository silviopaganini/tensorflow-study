import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Flex } from 'theme-ui'
import Routes from './routes'
import { Nav } from './components'

const App = () => (
  <Router>
    <Flex>
      <Nav />
      <Switch>
        {Routes.map(({ exact, path, component: Component }, index) => (
          <Route exact={exact} key={index} path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </Flex>
  </Router>
)

export default App
