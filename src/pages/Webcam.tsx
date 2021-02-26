import React, { useCallback, useEffect, useRef, useState } from 'react'
import { data, Tensor3D } from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { Box, Button, Heading, Container } from 'theme-ui'
import { Loading, ModelReadyContainer } from '../components'
import { isMobile } from '../common'
// import { useUserMedia } from '../hooks'

const CAMERA_SCALE = 1.2
const WIDTH = 640 * CAMERA_SCALE
const HEIGHT = 360 * CAMERA_SCALE

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [modelMobilenet, setModelMobilenet] = useState<mobilenet.MobileNet>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [result, setResult] = useState<JSX.Element[]>()
  // const [media] = useUserMedia({
  //   video: {
  //     facingMode: 'user',
  //     width: WIDTH,
  //     height: HEIGHT,
  //   },
  // })

  const classify = useCallback(
    (img: Tensor3D) => {
      const load = async (img: Tensor3D) => {
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

          img.dispose()
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

  const onCapture = async () => {
    if (!videoRef.current) return
    try {
      const webcam = await data.webcam(videoRef.current)
      const img = await webcam.capture()
      classify(img)
    } catch (e) {
      console.log(e)
    }
  }

  const loadModels = async () => {
    try {
      setModelMobilenet(await mobilenet.load())
      const loadCam = async (video: HTMLVideoElement) => {
        await data.webcam(
          video,
          isMobile()
            ? {
                facingMode: 'environment',
                resizeWidth: window.innerWidth,
                resizeHeight: window.innerHeight,
              }
            : undefined
        )
      }
      if (videoRef.current) loadCam(videoRef.current)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }

  useEffect(() => {
    loadModels()
  }, [videoRef])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Webcam object detection</Heading>
      <Heading as="h4" variant="styles.h4">
        Hold an object in front of your camera and click on "Capture" to analyse the camera feed
      </Heading>
      <ModelReadyContainer
        error={error}
        loadingMessage="Loading Mobilenet Tensorflow Models"
        modelLoaded={!!modelMobilenet}
      >
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
