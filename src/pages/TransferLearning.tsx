import { data, nextFrame } from '@tensorflow/tfjs'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Button, Flex } from 'theme-ui'
import { TFPage } from '../types'

const CAMERA_SCALE = 1.2
const POSES = ['left', 'up', 'down', 'center', 'right'].sort((a, b) => a.localeCompare(b))
let raf: number | undefined

const TransferLearning = ({ modelMobilenet, modelKnn }: TFPage) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [webcam, setWebcam] = useState<any>()
  const [result, setResult] = useState<JSX.Element>()
  const [takingPictures, setTakingPictures] = useState<boolean>(false)
  const [takenPoses, setTakenPoses] = useState<any[]>([])
  const [allPoses, setAllPoses] = useState<boolean>(false)

  useEffect(() => {
    const loadCam = async (video: HTMLVideoElement) => {
      setWebcam(await data.webcam(video))
    }
    if (videoRef.current) loadCam(videoRef.current)

    return () => {
      stopLoopDetection()
    }
  }, [videoRef])

  const stopLoopDetection = () => {
    if (raf) window.cancelAnimationFrame(raf)
    raf = undefined
  }

  const addExample = async (classId: number | string) => {
    setTakingPictures(true)
    let i = 0

    while (i < 15) {
      const img = await webcam.capture()
      const activation = modelMobilenet?.infer(img)

      if (activation) modelKnn?.addExample(activation, classId)

      img.dispose()
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
    if (!modelKnn) return
    if (modelKnn.getNumClasses() > 0) {
      const img = await webcam.capture()
      const activation = modelMobilenet?.infer(img)
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

      img.dispose()
    }

    raf = window.requestAnimationFrame(loopDetection)
  }

  const startLoopDetection = () => {
    loopDetection()
  }

  return (
    <Box p={4}>
      <Box sx={{ mx: 'auto', textAlign: 'center', maxWidth: 640 * CAMERA_SCALE }}>
        <Box>
          <video
            style={{
              transform: 'scaleX(-1)',
            }}
            width={640 * CAMERA_SCALE}
            height={480 * CAMERA_SCALE}
            ref={videoRef}
          ></video>
        </Box>
        <Box
          mt={3}
          sx={{
            opacity: takingPictures ? 0.5 : 1,
            pointerEvents: takingPictures ? 'none' : 'visible',
          }}
        >
          {!allPoses && (
            <Box>
              <Text>Teach the machine all angles of your face</Text>
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
            <Button onClick={startLoopDetection} mt={5}>
              Detect head position
            </Button>
          )}
        </Box>
        <Box mt={3}>{result}</Box>
      </Box>
    </Box>
  )
}

export default TransferLearning
