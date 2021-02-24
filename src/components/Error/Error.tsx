import React from 'react'
import { Flex, Text, Box } from 'theme-ui'

type ErrorProps = {
  text?: string
}

const Error = ({ text = 'Some error has occurred, please refresh your page' }: ErrorProps) => (
  <Box>
    <Flex sx={{ alignItems: 'center', py: 2 }}>
      <Text>{text}</Text>
    </Flex>
  </Box>
)

export default Error
