import '@tensorflow/tfjs'
import { Box, Image, Button } from 'theme-ui'
import { useCallback, useRef, useState } from 'react'
import { TFPage } from '../types'

const ImageDetection = ({ modelMobilenet, modelKnn }: TFPage) => {
  const ref = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const [key, setKey] = useState<number>(0)
  const [result, setResult] = useState<JSX.Element[]>()

  const classify = useCallback(
    (img: HTMLImageElement) => {
      const load = async (img: HTMLImageElement) => {
        if (!modelMobilenet) {
          setLoading(false)
          setResult(undefined)
          return
        }

        try {
          setLoading(true)
          const output = await modelMobilenet.classify(img)
          const outputList = output.map((o, index) => (
            <Box key={index}>
              <b>{o.className}</b> - {`${Math.round(o.probability * 100)}%`}
            </Box>
          ))

          setResult(outputList)
          setLoading(false)
        } catch (e) {
          setLoading(false)
          setResult(undefined)
          console.log(e)
        }
      }
      load(img)
    },
    [modelMobilenet]
  )

  const onLoadImage = () => {
    if (ref.current) classify(ref.current)
  }

  return (
    <Box p={4}>
      {modelMobilenet && (
        <Box sx={{ width: 1000 }}>
          <Box sx={{ height: 700 }}>
            <Image
              onLoad={onLoadImage}
              key={key}
              ref={ref}
              alt="cat"
              crossOrigin="anonymous"
              src="https://picsum.photos/1000/700"
            />
          </Box>
          <Box mt={3}>{loading ? 'loading' : result ? result : ''}</Box>
          {!loading && (
            <Button
              mt={3}
              variant="primary"
              onClick={() => {
                setLoading(true)
                setResult(undefined)
                setKey(key + 1)
              }}
            >
              reload
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ImageDetection
