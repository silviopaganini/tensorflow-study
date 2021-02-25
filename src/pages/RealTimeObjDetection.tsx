import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Container, Heading } from 'theme-ui'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import Stats from 'three/examples/jsm/libs/stats.module'

import { Error, Loading } from '../components'
import useUserMedia from '../hooks/useUserMedia'

const CAMERA_SCALE = 1.5
let raf = 0
let model: cocoSsd.ObjectDetection
let stats: Stats
let ctx: CanvasRenderingContext2D | null = null

const propsStatsContainer = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  '& > div': {
    position: 'static !important',
  },
}

const RealTimeObjDetection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [stream] = useUserMedia({ video: true })
  const [error, setError] = useState<boolean>(false)

  const analyseCamera = useCallback(async () => {
    try {
      if (ctx && videoRef.current && canvasRef.current) {
        ctx.save()
        ctx.scale(-1, 1)
        ctx.drawImage(videoRef.current, 0, 0, 640 * CAMERA_SCALE * -1, 360 * CAMERA_SCALE)
        ctx.restore()
        const predictions = await model.detect(canvasRef.current)
        predictions.forEach(p => {
          if (!ctx) return

          ctx.beginPath()
          ctx.strokeStyle = '0x00FF00'
          ctx.strokeRect(p.bbox[0], p.bbox[1], p.bbox[2], p.bbox[3])
          ctx.stroke()

          ctx.font =
            '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

          const text = `${p.class}: ${Math.round(p.score * 100)}%`

          const { width } = ctx.measureText(text)
          ctx.fillStyle = '#000'
          ctx.fillRect(p.bbox[0], p.bbox[1] - 30, width + 10, 30)

          ctx.fillStyle = '#fff'
          ctx.fillText(text, p.bbox[0] + 5, p.bbox[1] - 10)
        })
      }

      stats.update()
      raf = requestAnimationFrame(analyseCamera)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const loadModel = useCallback(async () => {
    try {
      setLoading(true)
      model = await cocoSsd.load()
      setLoading(false)
      analyseCamera()
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }, [setLoading, analyseCamera])

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return
    videoRef.current.srcObject = stream
    videoRef.current.onloadedmetadata = () => {
      videoRef?.current?.play()
      loadModel()
    }

    ctx = canvasRef.current.getContext('2d')

    if (!stats) {
      stats = Stats()
      statsRef.current?.appendChild(stats.dom)
    }

    return () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }, [canvasRef, videoRef, stream, loadModel])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Real-time Object Detection</Heading>
      <Heading as="h4" variant="styles.h4">
        Real-time object detection through webcam feed using coco-ssd Model
      </Heading>
      {error ? (
        <Error />
      ) : (
        <>
          {loading && <Loading text="Loading Coco-SSD Model" />}
          <Box sx={{ position: 'relative' }}>
            <video
              style={{ opacity: 0.4, transform: 'scaleX(-1)' }}
              ref={videoRef}
              width={640 * CAMERA_SCALE}
              height={360 * CAMERA_SCALE}
            />
            <canvas
              style={{ position: 'absolute', top: 0, left: 0 }}
              ref={canvasRef}
              width={640 * CAMERA_SCALE}
              height={360 * CAMERA_SCALE}
            />
          </Box>
        </>
      )}
      <Box
        //@ts-ignore
        sx={propsStatsContainer}
        ref={statsRef}
      />
    </Container>
  )
}

export default RealTimeObjDetection
