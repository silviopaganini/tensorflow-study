import { useEffect, useState } from 'react'

const useAnalyser = (stream?: MediaStream, fftSize: number = 1024) => {
  const [analyser, setAnalyser] = useState<AnalyserNode>()

  useEffect(() => {
    if (!stream || analyser) return

    const audioctx = new AudioContext()
    const source = audioctx.createMediaStreamSource(stream)
    const a = audioctx.createAnalyser()
    a.smoothingTimeConstant = 0

    source.connect(a)
    a.fftSize = fftSize
    setAnalyser(a)
  }, [stream, fftSize, analyser])

  return analyser
}

export default useAnalyser
