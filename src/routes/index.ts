import { ImageDetection, Webcam } from '../pages'

const Routes = [
  {
    path: '/tensorflow-study/image-detection',
    component: ImageDetection,
    name: 'Random Image Detection',
  },
  {
    path: '/tensorflow-study/webcam',
    component: Webcam,
    name: 'Webcam',
  },
]

export default Routes
