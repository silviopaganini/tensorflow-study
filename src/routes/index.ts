import {
  SentimentAnalysis,
  FaceMesh,
  Home,
  ImageDetection,
  TransferLearning,
  Webcam,
  // Audio,
  HandPose,
  RealTimeObjDetection,
  Audio,
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
    path: `${BASEPATH}realtime-obj-detection`,
    component: RealTimeObjDetection,
    name: 'Real-time Detection',
  },
  {
    path: `${BASEPATH}webcam`,
    component: Webcam,
    name: 'Snapshot Detection',
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

  {
    path: `${BASEPATH}audio-analysis`,
    component: Audio,
    name: 'Audio analysis',
  },
]

export default Routes
