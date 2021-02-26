import { nextFrame } from '@tensorflow/tfjs'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, Container, Heading } from 'theme-ui'
import * as knn from '@tensorflow-models/knn-classifier'
import * as mobilenet from '@tensorflow-models/mobilenet'
import { Error, Loading } from '../components'
import { removeUserMedia, useUserMedia } from '../hooks'

const CAMERA_SCALE = 2
const WIDTH = 1280 / CAMERA_SCALE
const HEIGHT = 720 / CAMERA_SCALE

const POSES = ['left', 'up', 'down', 'center', 'right'].sort((a, b) => a.localeCompare(b))
let raf: number | undefined

const TransferLearning = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [modelMobilenet, setModelMobilenet] = useState<mobilenet.MobileNet>()
  const [modelKnn, setModelKnn] = useState<knn.KNNClassifier>()
  const [result, setResult] = useState<JSX.Element>()
  const [takingPictures, setTakingPictures] = useState<boolean>(false)
  const [takenPoses, setTakenPoses] = useState<any[]>([])
  const [allPoses, setAllPoses] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [media] = useUserMedia({
    video: {
      width: WIDTH,
      height: HEIGHT,
    },
  })

  const stopLoopDetection = () => {
    if (raf) window.cancelAnimationFrame(raf)
    raf = undefined
  }

  const addExample = async (classId: number | string) => {
    if (!videoRef.current) return
    setTakingPictures(true)
    let i = 0

    while (i < 15) {
      const activation = modelMobilenet?.infer(videoRef.current)
      if (activation) modelKnn?.addExample(activation, classId)
      i++
      await nextFrame()
    }

    const poses = [...takenPoses, classId].sort((a, b) => a.localeCompare(b))
    setTakenPoses(poses)
    setTakingPictures(false)

    if (poses.toString() === POSES.toString()) {
      setAllPoses(true)
    }
  }

  const loopDetection = async () => {
    if (!modelKnn || !videoRef.current) return
    if (modelKnn.getNumClasses() > 0) {
      const activation = modelMobilenet?.infer(videoRef.current)
      const result = await modelKnn?.predictClass(activation!)

      setResult(
        <Box>
          <Box mb={2} sx={{ fontWeight: 'bold' }}>
            {result.label}
          </Box>
          {Object.keys(result.confidences).map((a, index) => (
            <Box key={index}>
              {a}: {result.confidences[a]}
            </Box>
          ))}
        </Box>
      )
    }

    raf = window.requestAnimationFrame(loopDetection)
  }

  const startLoopDetection = () => {
    loopDetection()
  }

  const loadModels = useCallback(async () => {
    try {
      setModelMobilenet(await mobilenet.load())
      setModelKnn(await knn.create())
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }, [setError, setModelKnn, setModelMobilenet])

  const setCamera = useCallback(() => {
    if (!videoRef.current || !media) return
    videoRef.current.onloadedmetadata = () => {
      videoRef.current && videoRef.current.play()
      loadModels()
    }
    videoRef.current.srcObject = media
  }, [media, loadModels])

  useEffect(() => {
    if (videoRef.current) setCamera()

    return () => {
      stopLoopDetection()
      removeUserMedia(media)
    }
  }, [videoRef, media, setCamera])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Transfer Learning</Heading>
      <Heading as="h4" variant="styles.h4">
        Teach the machine all five head positions to start the position analysis.
      </Heading>
      {error ? (
        <Error />
      ) : (
        <>
          {(!modelKnn || !modelMobilenet) && (
            <Loading text="Loading Mobilenet and KNN Tensorflow Models" />
          )}
          <Box sx={{ maxWidth: WIDTH }}>
            <Box>
              <video
                style={{
                  transform: 'scaleX(-1)',
                }}
                width={WIDTH}
                height={HEIGHT}
                ref={videoRef}
              />
            </Box>
            {modelKnn && modelMobilenet && (
              <>
                <Box
                  mt={3}
                  sx={{
                    opacity: takingPictures ? 0.5 : 1,
                    pointerEvents: takingPictures ? 'none' : 'visible',
                  }}
                >
                  {!allPoses && (
                    <Box>
                      <Flex sx={{ mt: 3, justifyContent: 'space-between' }}>
                        <Button onClick={() => addExample('left')} variant="secondary">
                          Left
                        </Button>
                        <Button onClick={() => addExample('up')} variant="secondary">
                          Up
                        </Button>
                        <Button onClick={() => addExample('center')} variant="secondary">
                          Center
                        </Button>
                        <Button onClick={() => addExample('down')} variant="secondary">
                          Down
                        </Button>
                        <Button onClick={() => addExample('right')} variant="secondary">
                          Right
                        </Button>
                      </Flex>
                    </Box>
                  )}
                  {allPoses && (
                    <Button variant="primary" onClick={startLoopDetection} mt={2}>
                      Detect head position
                    </Button>
                  )}
                </Box>
                <Box mt={3}>{result}</Box>
              </>
            )}
          </Box>
        </>
      )}
    </Container>
  )
}

export default TransferLearning
