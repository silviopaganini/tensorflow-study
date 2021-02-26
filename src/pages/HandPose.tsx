import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Container, Heading } from 'theme-ui'
import * as handpose from '@tensorflow-models/handpose'
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

import * as dat from 'dat.gui'

import { Error, Loading } from '../components'
import { useUserMedia, removeUserMedia } from '../hooks'
import { PALLETE } from '../common'

const CAMERA_SCALE = 1.25
let model: handpose.HandPose | undefined = undefined
let raf = 0

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

const propsGui = {
  offsetX: -215,
  offsetY: 137,
}

const HandPose = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [stream] = useUserMedia({ video: true })
  const [error, setError] = useState<boolean>(false)

  const estimateHands = useCallback(async () => {
    try {
      const predictions = videoRef.current && (await model?.estimateHands(videoRef.current))

      if (canvasRef.current) {
        positions = []
        colors = []
        const { width, height } = canvasRef.current
        predictions?.forEach(p => {
          Object.keys(p.annotations).forEach((a, index) => {
            color.setHex(PALLETE[index % (PALLETE.length - 1)])
            p.annotations[a].forEach(i => {
              positions.push(
                i[0] - width / 2 + propsGui.offsetX,
                height / 2 - i[1] + propsGui.offsetY,
                -i[2]
              )
              colors.push(color.r, color.g, color.b)
            })
          })
        })

        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
        geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
        geometry.computeBoundingSphere()
        points.geometry.attributes.position.needsUpdate = true
      }

      renderer.render(scene, camera)
      stats.update()
      raf = requestAnimationFrame(estimateHands)
    } catch (e) {
      console.log(e)
    }
  }, [])

  const loadModel = useCallback(async () => {
    try {
      setLoading(true)
      model = await handpose.load()
      setLoading(false)
      estimateHands()
    } catch (e) {
      setError(true)
      console.log(e)
    }
  }, [setLoading, estimateHands])

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current || !stream) return
    videoRef.current.srcObject = stream
    videoRef.current.onloadedmetadata = () => {
      videoRef.current!.play()
      loadModel()
    }

    const { width, height } = canvasRef.current

    camera = new PerspectiveCamera(90, width / height, 0.1, 1000)
    camera.position.z = width / 2

    const texture = new TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png'
    )
    //

    renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    })

    renderer.setSize(width, height)

    const material = new PointsMaterial({ size: 20, vertexColors: true, map: texture })

    points = new Points(geometry, material)
    scene.add(points)

    if (!stats) {
      stats = Stats()
      statsRef.current?.appendChild(stats.dom)
    }

    const gui = new dat.GUI()
    gui.add(propsGui, 'offsetX', -300, 300, 1)
    gui.add(propsGui, 'offsetY', -300, 300, 1)

    return () => {
      gui.destroy()
      cancelAnimationFrame(raf)
      removeUserMedia(stream)
      raf = 0
      stats.end()
    }
  }, [canvasRef, videoRef, stream, loadModel])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Hand Mesh</Heading>
      <Heading as="h4" variant="styles.h4">
        Put your hand where the camera can see and start tracking and tracing your hand mesh.
        <br />
        <br />
        Each color group represents one feature of the hand being mapped, which means we can get the
        positons individually.
      </Heading>
      {error ? (
        <Error />
      ) : (
        <>
          {loading && (
            <Box mt={2}>
              <Loading text="Loading Hand Pose Model" />
            </Box>
          )}
          <Box sx={{ mt: 2, position: 'relative' }}>
            <video
              style={{ opacity: 0.4, transform: 'scaleX(-1)' }}
              ref={videoRef}
              width={640 * CAMERA_SCALE}
              height={360 * CAMERA_SCALE}
            />
            <canvas
              style={{ transform: 'scaleX(-1)', position: 'absolute', top: 0, left: 0 }}
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

export default HandPose
