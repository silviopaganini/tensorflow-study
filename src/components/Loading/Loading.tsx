import React from 'react'
import { Flex, Spinner, Label } from 'theme-ui'

type LoadingProps = {
  text?: string
}

const Loading = ({ text = 'Loading' }: LoadingProps) => (
  <Flex>
    <Flex sx={{ alignItems: 'center', py: 2 }}>
      <Spinner variant="styles.spinner" />
      <Label>{text}</Label>
    </Flex>
  </Flex>
)

export default Loading
