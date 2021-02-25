import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Image, Button, Heading, Container } from 'theme-ui'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { Loading, Error } from '../components'

const ImageDetection = () => {
  const ref = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [modelMobilenet, setModelMobilenet] = useState<mobilenet.MobileNet>()
  const [error, setError] = useState<boolean>(false)
  const [key, setKey] = useState<number>(0)
  const [result, setResult] = useState<JSX.Element[]>()

  const classify = useCallback(
    (img: HTMLImageElement) => {
      const load = async (img: HTMLImageElement) => {
        if (!modelMobilenet) {
          setLoading(false)
          setResult(undefined)
          return
        }

        try {
          setLoading(true)
          const output = await modelMobilenet.classify(img)
          const outputList = output.map((o, index) => (
            <Box key={index}>
              <b>{o.className}</b> - {`${Math.round(o.probability * 100)}%`}
            </Box>
          ))

          setResult(outputList)
          setLoading(false)
        } catch (e) {
          setLoading(false)
          setResult(undefined)
          console.log(e)
        }
      }
      load(img)
    },
    [modelMobilenet]
  )

  const onLoadImage = () => {
    if (ref.current) classify(ref.current)
  }

  const loadModels = async () => {
    try {
      setModelMobilenet(await mobilenet.load())
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }

  useEffect(() => {
    loadModels()
  }, [])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Random Image Detection</Heading>
      {error ? (
        <Error />
      ) : modelMobilenet ? (
        <Container>
          <Image
            onLoad={onLoadImage}
            key={key}
            ref={ref}
            alt="cat"
            crossOrigin="anonymous"
            src={`https://loremflickr.com/1000/700/nature?lock=${key}`}
            sx={{ maxHeight: 700, width: 'auto' }}
          />
          {result && <Box mt={3}>{result}</Box>}
          <Button
            mt={3}
            variant="primary"
            sx={{ pointerEvents: loading ? 'none' : 'visible', opacity: loading ? 0.5 : 1 }}
            onClick={() => {
              setLoading(true)
              setResult(undefined)
              setKey(key + 1)
            }}
          >
            {loading ? 'Loading...' : 'Try a new image'}
          </Button>
        </Container>
      ) : (
        <Loading text="Loading Mobilenet Tensorflow Models" />
      )}
    </Container>
  )
}

export default ImageDetection
