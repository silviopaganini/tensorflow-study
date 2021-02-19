import { useCallback, useEffect, useRef } from 'react'
import { Box } from 'theme-ui'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'

let raf = 0

const NUM_KEYPOINTS = 468
const NUM_IRIS_KEYPOINTS = 5
const BLUE = '#157AB3'
const RED = '#FF2C35'
const VIDEO_SIZE = 500

let ctx: CanvasRenderingContext2D
let model: faceLandmarksDetection.FaceLandmarksPackage

const distance = (a: number[], b: number[]) => {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

const FaceMesh = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const loopPredictions = useCallback(async () => {
    if (model && videoRef.current && ctx) {
      const predictions = await model.estimateFaces({
        returnTensors: false,
        flipHorizontal: false,
        input: videoRef.current,
      })

      ctx.drawImage(videoRef.current, 0, 0, VIDEO_SIZE, VIDEO_SIZE, 0, 0, VIDEO_SIZE, VIDEO_SIZE)

      predictions.forEach(prediction => {
        const keypoints = prediction.mesh

        ctx.fillStyle = BLUE

        for (let i = 0; i < NUM_KEYPOINTS; i++) {
          //@ts-ignore
          const x = keypoints[i][0]
          //@ts-ignore
          const y = keypoints[i][1]

          ctx.beginPath()
          ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI)
          ctx.fill()
        }

        //@ts-ignore
        if (keypoints.length > NUM_KEYPOINTS) {
          ctx.strokeStyle = RED
          ctx.lineWidth = 1

          //@ts-ignore
          const leftCenter = keypoints[NUM_KEYPOINTS]
          //@ts-ignore
          const leftDiameterY = distance(keypoints[NUM_KEYPOINTS + 4], keypoints[NUM_KEYPOINTS + 2])
          //@ts-ignore
          const leftDiameterX = distance(keypoints[NUM_KEYPOINTS + 3], keypoints[NUM_KEYPOINTS + 1])

          ctx.beginPath()
          ctx.ellipse(
            leftCenter[0],
            leftCenter[1],
            leftDiameterX / 2,
            leftDiameterY / 2,
            0,
            0,
            2 * Math.PI
          )
          ctx.stroke()

          //@ts-ignore
          if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
            //@ts-ignore
            const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS]
            const rightDiameterY = distance(
              //@ts-ignore
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
              //@ts-ignore
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
            )
            const rightDiameterX = distance(
              //@ts-ignore
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
              //@ts-ignore
              keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
            )

            ctx.beginPath()
            ctx.ellipse(
              rightCenter[0],
              rightCenter[1],
              rightDiameterX / 2,
              rightDiameterY / 2,
              0,
              0,
              2 * Math.PI
            )
            ctx.stroke()
          }
        }
      })
    }

    raf = requestAnimationFrame(loopPredictions)
  }, [])

  const loadModel = useCallback(async () => {
    model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
    )

    loopPredictions()
  }, [loopPredictions])

  const setupCamera = useCallback(
    async (video: HTMLVideoElement) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            // Only setting the video to a specified size in order to accommodate a
            // point cloud, so on mobile devices accept the default size.
            width: VIDEO_SIZE,
            height: VIDEO_SIZE,
          },
        })

        ctx = canvasRef?.current?.getContext('2d')!
        ctx.translate(VIDEO_SIZE, 0)
        ctx.scale(-1, 1)
        ctx.fillStyle = BLUE
        ctx.strokeStyle = BLUE
        ctx.lineWidth = 0.5

        const onLoadedMetadata = () => {
          video.removeEventListener('loadedmetadata', onLoadedMetadata)
          loadModel()
        }
        video.addEventListener('loadedmetadata', onLoadedMetadata)
        video.srcObject = stream
      } catch (e) {
        console.log(e)
      }
    },
    [loadModel]
  )

  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      console.log('useEffect')
      setupCamera(videoRef.current)
    }

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [setupCamera])

  return (
    <Box p={4}>
      <Box sx={{ position: 'relative' }}>
        <video
          autoPlay
          style={{
            transform: 'scaleX(-1)',
            visibility: 'hidden',
            width: 'auto',
            height: 'auto',
          }}
          ref={videoRef}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3d(-50%, -50%, 0)',
          }}
          width={VIDEO_SIZE}
          height={VIDEO_SIZE}
        />
      </Box>
    </Box>
  )
}

export default FaceMesh
