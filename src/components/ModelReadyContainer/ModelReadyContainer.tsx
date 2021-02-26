import React, { ReactNode } from 'react'
import { Box } from 'theme-ui'
import { Loading, Error } from '..'

type ModelReadyContainerProps = {
  loadingMessage?: string
  error?: boolean
  modelLoaded?: boolean
  children: ReactNode
}

const ModelReadyContainer = ({
  children,
  error,
  modelLoaded,
  loadingMessage = 'Loading',
}: ModelReadyContainerProps) => (
  <Box>
    {error ? <Error /> : <>{!modelLoaded ? <Loading text={loadingMessage} /> : children}</>}
  </Box>
)

export default ModelReadyContainer
