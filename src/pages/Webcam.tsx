import React, { useCallback, useEffect, useRef, useState } from 'react'
import { data, Tensor3D } from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { Box, Button, Heading, Container } from 'theme-ui'
import { Error, Loading } from '../components'

const CAMERA_SCALE = 1.2

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [modelMobilenet, setModelMobilenet] = useState<mobilenet.MobileNet>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [result, setResult] = useState<JSX.Element[]>()

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
        await data.webcam(video)
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
      {error ? (
        <Error />
      ) : modelMobilenet ? (
        <>
          <Box mb={4}>
            <video
              style={{
                transform: 'scaleX(-1)',
              }}
              width={640 * CAMERA_SCALE}
              height={480 * CAMERA_SCALE}
              ref={videoRef}
            ></video>
          </Box>
          <Button onClick={onCapture} variant="primary">
            Capture
          </Button>
          {loading && <Loading text="Analysing" />}
          {result && <Box mt={3}>{result}</Box>}
        </>
      ) : (
        <Loading text="Loading Mobilenet Tensorflow Models" />
      )}
    </Container>
  )
}

export default Webcam
