import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Container, Heading } from 'theme-ui'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'

import Stats from 'three/examples/jsm/libs/stats.module'
import {
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  Float32BufferAttribute,
  WebGLRenderer,
  PointsMaterial,
  Points,
  Color,
  TextureLoader,
} from 'three'

import { Error, Loading } from '../components'
import { removeUserMedia, useUserMedia } from '../hooks'
import { PALLETE } from '../common'

let raf = 0

const CAMERA_SCALE = 1.25
const WIDTH = 640 * CAMERA_SCALE
const HEIGHT = 360 * CAMERA_SCALE

let model: faceLandmarksDetection.FaceLandmarksPackage

const scene = new Scene()
let camera: PerspectiveCamera
let renderer: WebGLRenderer
const geometry = new BufferGeometry()
let positions: number[] = []
const color: Color = new Color()
let colors: number[] = []
let points: Points
let stats: Stats

const propsStatsContainer = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  '& > div': {
    position: 'static !important',
  },
}

const FaceMesh = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [media] = useUserMedia({
    video: {
      facingMode: 'user',
      width: WIDTH,
      height: HEIGHT,
    },
  })

  const loopPredictions = useCallback(async () => {
    try {
      if (!model || !videoRef.current || !canvasRef.current) {
        raf = requestAnimationFrame(loopPredictions)
        return
      }

      const predictions = await model.estimateFaces({
        returnTensors: false,
        flipHorizontal: false,
        input: videoRef.current,
      })

      positions = []
      colors = []

      const { width, height } = canvasRef.current
      predictions?.forEach(p => {
        //@ts-ignore
        const { annotations } = p

        Object.keys(annotations).forEach((a, index) => {
          color.setHex(PALLETE[index % (PALLETE.length - 1)])
          annotations[a].forEach((i: number[]) => {
            positions.push(i[0] - width / 2, height / 2 - i[1], -i[2])
            colors.push(color.r, color.g, color.b)
          })
        })
      })

      geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
      geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
      geometry.computeBoundingSphere()
      points.geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      stats.update()
    } catch (e) {
      console.log(e)
    }

    raf = requestAnimationFrame(loopPredictions)
  }, [])

  const loadModel = useCallback(async () => {
    try {
      setLoading(true)
      model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      )

      setLoading(false)
      loopPredictions()
    } catch (e) {
      setLoading(false)
      setError(true)
    }
  }, [loopPredictions])

  useEffect(() => {
    if (!videoRef.current || !media) return
    videoRef.current.srcObject = media
    videoRef.current.onloadedmetadata = () => {
      videoRef.current?.play()

      if (!canvasRef.current) return
      const { width, height } = canvasRef.current

      camera = new PerspectiveCamera(60, width / height, 0.1, 1000)
      camera.position.z = width / 2

      const texture = new TextureLoader().load(
        'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
      )
      //

      renderer = new WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
      })

      renderer.setSize(width, height)

      const material = new PointsMaterial({ size: 10, vertexColors: true, map: texture })

      points = new Points(geometry, material)
      scene.add(points)

      if (!stats) {
        stats = Stats()
        statsRef.current?.appendChild(stats.dom)
      }

      loadModel()
    }

    return () => {
      cancelAnimationFrame(raf)
      removeUserMedia(media)
      stats?.end()
    }
  }, [media, loadModel, videoRef, canvasRef, statsRef])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Face Mesh</Heading>
      <Heading as="h4" variant="styles.h4">
        Create the face mesh of the detected face on the camera feed. <br />
        <br />
        Each color group represents one feature of the face being mapped, which means we can get the
        positons individually.
      </Heading>
      {error ? (
        <Error />
      ) : (
        <>
          {loading && (
            <Box mt={2}>
              <Loading text="Loading Face Landmarks Model" />
            </Box>
          )}
          <Box sx={{ position: 'relative', mt: 2 }}>
            <video style={{ opacity: 0.4 }} autoPlay ref={videoRef} width={WIDTH} height={HEIGHT} />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
              width={WIDTH}
              height={HEIGHT}
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

export default FaceMesh
