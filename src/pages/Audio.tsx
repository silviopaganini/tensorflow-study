import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Text, Container, Heading, Link } from 'theme-ui'
import * as speechCommands from '@tensorflow-models/speech-commands'
import { useUserMedia, useAnalyser, removeUserMedia } from '../hooks'
import { Error, Loading } from '../components'

let raf = 0

const Audio = () => {
  const [media] = useUserMedia({ audio: true })
  const analyser = useAnalyser(media)
  const [model, setModel] = useState<speechCommands.SpeechCommandRecognizer>()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<boolean>(false)
  const [result, setResult] = useState<JSX.Element[]>()

  const drawCanvas = (
    freqData: Uint8Array,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    for (let i = 0; i < freqData.length; i++) {
      let value = 2 * freqData[i] * 255

      let colorValue = Math.max(0, 255 * value)
      colorValue = Math.pow(colorValue, 3)
      colorValue = Math.round(255 * colorValue)
      const fillStyle = `rgb(${colorValue},${255 - colorValue},${255 - colorValue})`

      ctx.beginPath()
      ctx.strokeStyle = fillStyle
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

  const loadModel = useCallback(async () => {
    try {
      const URL = window.location.origin
      const checkpointURL = `${URL}/model/model.json` // model topology
      const metadataURL = `${URL}/model/metadata.json` // model metadata

      const recognizer = speechCommands.create(
        'BROWSER_FFT', // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful when training models with teachable machine
        checkpointURL,
        metadataURL
      )

      // check that model and metadata are loaded via HTTPS requests.
      await recognizer.ensureModelLoaded()

      setModel(recognizer)
      const classLabels = recognizer.wordLabels() // get class labels

      getAudioData()

      await recognizer.listen(
        //@ts-ignore
        result => {
          const results = Object.keys(classLabels).reduce((acc, _i, index) => {
            const classPrediction =
              classLabels[index] + ': ' + Number(result.scores[index]).toFixed(2)
            acc.push(
              <Box sx={{ opacity: result.scores[index] > 0.7 ? 1 : 0.5 }} key={_i}>
                {classPrediction}
              </Box>
            )
            return acc
          }, [] as JSX.Element[])

          setResult(results)
        },
        {
          includeSpectrogram: false,
          probabilityThreshold: 0.75,
          invokeCallbackOnNoiseAndUnknown: true,
          overlapFactor: 0.5,
        }
      )
    } catch (e) {
      setError(true)
    }
  }, [setError, getAudioData])

  useEffect(() => {
    if (!analyser || !canvasRef.current) return
    loadModel()

    return () => {
      removeUserMedia(media)
      cancelAnimationFrame(raf)
    }
  }, [canvasRef, analyser, loadModel, media])

  return (
    <Container as="section" variant="layout.section">
      <Heading as="h2">Audio Analysis</Heading>
      <Heading as="h4" variant="styles.h4">
        Model trained to detect{' '}
        <Text as="span" sx={{ color: 'green' }}>
          "Yes"
        </Text>
        and{' '}
        <Text as="span" sx={{ color: 'green' }}>
          "No"
        </Text>{' '}
        instructions,{' '}
        <Text as="span" sx={{ color: 'green' }}>
          clapping
        </Text>{' '}
        and{' '}
        <Text as="span" sx={{ color: 'green' }}>
          typing
        </Text>{' '}
        noises using{' '}
        <Link href="https://teachablemachine.withgoogle.com" target="_blank">
          Teachable Machine
        </Link>{' '}
        from Google.
      </Heading>
      <canvas ref={canvasRef} width={800} height={500} />
      {error ? (
        <Error />
      ) : model ? (
        <Box>{result || 'listening...'}</Box>
      ) : (
        <Loading text="Loading SpeechCommand Models" />
      )}
    </Container>
  )
}

export default Audio
