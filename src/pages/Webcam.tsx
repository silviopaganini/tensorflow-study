import { useCallback, useEffect, useRef, useState } from 'react'
import { data, Tensor3D } from '@tensorflow/tfjs'
import { Box, Button } from 'theme-ui'
import { TFPage } from '../types'

const Webcam = ({ model }: TFPage) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [result, setResult] = useState<JSX.Element[]>()

  const classify = useCallback(
    (img: Tensor3D) => {
      const load = async (img: Tensor3D) => {
        if (!model) {
          setResult(undefined)
          return
        }

        try {
          setLoading(true)
          const output = await model.classify(img)
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
    [model]
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

  useEffect(() => {
    const loadCam = async (video: HTMLVideoElement) => {
      await data.webcam(video)
    }
    if (videoRef.current) loadCam(videoRef.current)
  }, [videoRef])

  return (
    <Box p={4}>
      <Box>
        <video width="960" height="720" ref={videoRef}></video>
      </Box>
      <Button onClick={onCapture} variant="primary">
        Capture
      </Button>
      {loading && <Box>loading</Box>}
      {result && <Box mt={3}>{result}</Box>}
    </Box>
  )
}

export default Webcam
