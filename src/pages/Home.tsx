import React from 'react'
import { Container, Text, Heading, Link } from 'theme-ui'

const Home = () => {
  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Hello World</Heading>
      <Text>
        This is a series of Machine Learning experiments using TensorFlow.js, React and Theme-ui by{' '}
        <Link variant="text" href="https://s2paganini.com" target="_blank">
          Silvio Paganini
        </Link>
        .
      </Text>
      <Text>Choose the experiments on the left menu to start.</Text>
    </Container>
  )
}

export default Home
