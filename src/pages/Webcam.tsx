import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { Box, Button, Heading, Container } from 'theme-ui'
import { Loading, ModelReadyContainer } from '../components'
import { isMobile } from '../common'
import { removeUserMedia, useUserMedia } from '../hooks'

const CAMERA_SCALE = 2
const WIDTH = 1280 / CAMERA_SCALE
const HEIGHT = 720 / CAMERA_SCALE

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [modelMobilenet, setModel] = useState<mobilenet.MobileNet>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [result, setResult] = useState<JSX.Element[]>()
  const [media] = useUserMedia({
    video: {
      width: WIDTH,
      height: HEIGHT,
    },
  })

  const classify = useCallback(
    (img: HTMLVideoElement) => {
      const load = async (img: HTMLVideoElement) => {
        if (!modelMobilenet) {
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

  const onCapture = () => {
    if (!videoRef.current) return
    try {
      classify(videoRef.current)
    } catch (e) {
      console.log(e)
    }
  }

  const loadModels = useCallback(async () => {
    try {
      setModel(await mobilenet.load())
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }, [setError, setModel])

  const setCamera = useCallback(() => {
    if (!videoRef.current || !media) return
    videoRef.current.onloadedmetadata = () => {
      videoRef.current && videoRef.current.play()
      loadModels()
    }
    videoRef.current.srcObject = media
  }, [media, loadModels])

  useEffect(() => {
    setCamera()

    return () => {
      removeUserMedia(media)
    }
  }, [setCamera, media])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Webcam object detection</Heading>
      <Heading as="h4" variant="styles.h4">
        Hold an object in front of your camera and click on "Capture" to analyse the camera feed
      </Heading>
      <Box
        sx={{
          position: ['absolute', 'absolute', 'relative'],
          top: [0, 0, 'auto'],
          left: [0, 0, 'auto'],
          width: ['100%', '100%', 'auto'],
          height: ['100%', '100%', 'auto'],
          maxWidth: ['auto', 'auto', WIDTH],
          maxHeight: ['auto', 'auto', HEIGHT],
          zIndex: [-1, -1, 2],
        }}
      >
        <video
          style={{
            transform: 'scaleX(-1)',
          }}
          width={isMobile() ? window.innerWidth : WIDTH}
          height={isMobile() ? window.innerHeight : HEIGHT}
          ref={videoRef}
        />
      </Box>

      <ModelReadyContainer
        error={error}
        loadingMessage="Loading Mobilenet Tensorflow Models"
        modelLoaded={!!modelMobilenet}
      >
        <Button sx={{ mt: 4 }} onClick={onCapture} variant="primary">
          Capture
        </Button>
        {loading && <Loading text="Analysing" />}
        {result && <Box mt={3}>{result}</Box>}
      </ModelReadyContainer>
    </Container>
  )
}

export default Webcam
