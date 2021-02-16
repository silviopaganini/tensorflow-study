import { ImageDetection, Webcam } from '../pages'

const Routes = [
  {
    path: './image-detection',
    component: ImageDetection,
    name: 'Random Image Detection',
  },
  {
    path: './webcam',
    component: Webcam,
    name: 'Webcam',
  },
]

export default Routes
