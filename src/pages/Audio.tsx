import { useCallback, useEffect, useRef } from 'react'
import { Box } from 'theme-ui'
import useAnalyser from '../hooks/useAnalyser'
import useUserMedia from '../hooks/useUserMedia'

let raf = 0

const Audio = () => {
  const [media] = useUserMedia({ audio: true })
  const analyser = useAnalyser(media)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawCanvas = (
    freqData: Uint8Array,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    for (let i = 0; i < freqData.length; i++) {
      let value = 2 * freqData[i] * 255

      ctx.beginPath()
      ctx.strokeStyle = `rgba(${Math.max(0, 255 * value)}, ${Math.max(
        0,
        255 * (value - 1)
      )}, 54, 255)`
      ctx.moveTo(canvas.width - 1, canvas.height - i * (canvas.height / freqData.length))

      ctx.lineTo(
        canvas.width - 1,
        canvas.height - (i * canvas.height) / freqData.length + canvas.height / freqData.length
      )
      ctx.stroke()
    }
  }

  const getAudioData = useCallback(() => {
    if (!analyser || !canvasRef.current) {
      raf = requestAnimationFrame(getAudioData)
      return
    }

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) {
      raf = requestAnimationFrame(getAudioData)
      return
    }

    const freqData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(freqData)

    const imageData = ctx.getImageData(1, 0, canvasRef.current.width - 1, canvasRef.current.height)
    ctx.putImageData(imageData, 0, 0)

    drawCanvas(freqData, ctx, canvasRef.current)

    raf = requestAnimationFrame(getAudioData)
  }, [analyser])

  useEffect(() => {
    if (!analyser || !canvasRef.current) return
    getAudioData()

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [analyser, getAudioData, canvasRef])

  return (
    <Box p={4}>
      <canvas ref={canvasRef} width={800} height={500} />
    </Box>
  )
}

export default Audio
