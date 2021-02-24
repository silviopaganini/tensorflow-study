import { useEffect, useState } from 'react'

const useUserMedia = (props: MediaStreamConstraints) => {
  const [media, setMedia] = useState<MediaStream>()
  const [error, setError] = useState<any>()

  useEffect(() => {
    if (media) return
    const getMedia = async () => {
      try {
        setMedia(await navigator.mediaDevices.getUserMedia(props))
      } catch (e) {
        setError(e)
      }
    }

    getMedia()
  }, [props, media])

  return [media, error]
}

export default useUserMedia
