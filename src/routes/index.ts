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

const { homepage: BASEPATH } = require('../../package.json')

const Routes = [
  {
    path: BASEPATH,
    component: Home,
    name: 'Home',
    exact: true,
  },
  {
    path: `${BASEPATH}image-detection`,
    component: ImageDetection,
    name: 'Random Image Detection',
  },
  {
    path: `${BASEPATH}webcam`,
    component: Webcam,
    name: 'Object Detection',
  },
  {
    path: `${BASEPATH}transfer-learning`,
    component: TransferLearning,
    name: 'Transfer Learning',
  },
  {
    path: `${BASEPATH}sentiment`,
    component: SentimentAnalysis,
    name: 'Sentiment Analysis',
  },
  {
    path: `${BASEPATH}facemesh`,
    component: FaceMesh,
    name: 'Face Mesh',
  },

  {
    path: `${BASEPATH}hand-pose`,
    component: HandPose,
    name: 'Hand Mesh',
  },
  // {
  //   path: `${BASEPATH}audio`,
  //   component: Audio,
  //   name: 'Audio',
  // },
]

export default Routes
