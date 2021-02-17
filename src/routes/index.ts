import { Home, ImageDetection, TransferLearning, Webcam } from '../pages'
import SentimentAnalysis from '../pages/SentimentAnalysis'

const Routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    exact: true,
  },
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
  {
    path: '/tensorflow-study/transfer-learning',
    component: TransferLearning,
    name: 'Transfer Learning',
  },
  {
    path: '/tensorflow-study/sentiment',
    component: SentimentAnalysis,
    name: 'Sentiment Analysis',
  },
]

export default Routes
