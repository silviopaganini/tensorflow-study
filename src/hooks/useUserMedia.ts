import { useEffect, useState } from 'react'

const useUserMedia = (props: MediaStreamConstraints): [MediaStream?, Error?] => {
  const [media, setMedia] = useState<MediaStream>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    if (media) return
    const getMedia = async () => {
      try {
        const m = await navigator.mediaDevices.getUserMedia(props)
        m.addEventListener('removetrack', () => {
          console.log('removetrack')
        })
        setMedia(m)
      } catch (e) {
        setError(e)
      }
    }

    getMedia()
  }, [props, media])
  return [media, error]
}

export const removeUserMedia = (media?: MediaStream) => {
  media?.getTracks().forEach(m => {
    m.stop()
    media.removeTrack(m)
  })
}

export default useUserMedia
