import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Text } from 'theme-ui'
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

import useUserMedia from '../hooks/useUserMedia'

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

const propsGui = {
  offsetX: -215,
  offsetY: 137,
}

const palette = [0xedae49, 0xd1495b, 0x00798c, 0x30638e, 0x003d5b, 0x4b3f72, 0xe9190f]

const gui = new dat.GUI()
gui.add(propsGui, 'offsetX', -300, 300, 1)
gui.add(propsGui, 'offsetY', -300, 300, 1)

const HandPose = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loading, setLoading] = useState(true)
  const [stream] = useUserMedia({ video: true })

  const estimateHands = useCallback(async () => {
    try {
      const predictions = videoRef.current && (await model?.estimateHands(videoRef.current))

      if (canvasRef.current) {
        positions = []
        colors = []
        const { width, height } = canvasRef.current
        predictions?.forEach(p => {
          Object.keys(p.annotations).forEach((a, index) => {
            color.setHex(palette[index % (palette.length - 1)])
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
      console.log(e)
    }
  }, [setLoading, estimateHands])

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return
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

    const material = new PointsMaterial({ size: 10, vertexColors: true, map: texture })

    points = new Points(geometry, material)
    scene.add(points)

    stats = Stats()
    document.body.appendChild(stats.dom)

    return () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }, [canvasRef, videoRef, stream, loadModel])

  return (
    <Box p={4}>
      <Box sx={{ position: 'relative' }}>
        <video
          style={{ transform: 'scaleX(-1)' }}
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

      {loading && <Text>Loading Hand pose model...</Text>}
    </Box>
  )
}

export default HandPose
