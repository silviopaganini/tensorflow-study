import {
  SentimentAnalysis,
  FaceMesh,
  Home,
  ImageDetection,
  TransferLearning,
  Webcam,
  // Audio,
  HandPose,
} from '../pages'

const Routes = [
  {
    path: '/tensorflow-study/',
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
    name: 'Object Detection',
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
  {
    path: '/tensorflow-study/facemesh',
    component: FaceMesh,
    name: 'Face Mesh',
  },

  {
    path: '/tensorflow-study/hand-pose',
    component: HandPose,
    name: 'Hand Mesh',
  },
  // {
  //   path: '/tensorflow-study/audio',
  //   component: Audio,
  //   name: 'Audio',
  // },
]

export default Routes
