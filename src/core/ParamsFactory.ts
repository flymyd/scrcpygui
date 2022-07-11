enum ATTACH_PARAMS_TYPE {
  'EQUALS', 'SPACE', 'ADD', 'SPACE_STRING'
}
export const paramsMap = {
  //Mirror Settings
  reduceSize: {
    params: '--max-size',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  changeBitRate: {
    params: '--bit-rate',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  maxFps: {
    params: '--max-fps',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  crop: {
    params: '--crop',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  screenOrientation: {
    params: '--lock-video-orientation',
    type: ATTACH_PARAMS_TYPE.EQUALS
  },
  encoder: {
    params: '--encoder',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  //Capture Settings
  recordFile: {
    params: '--record',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  recordWithoutMirror: {
    params: '--no-display',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  v4l2loopback: {
    params: '--v4l2-sink',
    type: ATTACH_PARAMS_TYPE.EQUALS
  },
  displayBuffer: {
    params: '--display-buffer',
    type: ATTACH_PARAMS_TYPE.EQUALS
  },
  v4l2Buffer: {
    params: '--v4l2-buffer',
    type: ATTACH_PARAMS_TYPE.EQUALS
  },
  //Connection Settings
  serial: {
    params: '--serial',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  //Others Settings
  title: {
    params: '--window-title',
    type: ATTACH_PARAMS_TYPE.SPACE_STRING
  },
  xCoor: {
    params: '--window-x',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  yCoor: {
    params: '--window-y',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  width: {
    params: '--window-width',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  height: {
    params: '--window-height',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  borderless: {
    params: '--window-borderless',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  alwaysOnTop: {
    params: '--always-on-top',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  fullscreen: {
    params: '--fullscreen',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  rotation: {
    params: '--rotation',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  readonly: {
    params: '--no-control',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  monitor: {
    params: '--display',
    type: ATTACH_PARAMS_TYPE.SPACE
  },
  stayAwake: {
    params: '--stay-awake',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  closeScreen: {
    params: '--turn-screen-off',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  closeScreenAfterDisconnected: {
    params: '--power-off-on-close',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  autoScreenOn: {
    params: '--no-power-on',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  showTouches: {
    params: '--show-touches',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  disableScreensaver: {
    params: '--disable-screensaver',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  pushDestination: {
    params: '--push-target',
    type: ATTACH_PARAMS_TYPE.EQUALS
  },
  //InputControl Settings
  disableClipBoardAutoSync: {
    params: '--no-clipboard-autosync',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  hidKeyboard: {
    params: '--hid-keyboard',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  hidMouse: {
    params: '--hid-mouse',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  forwardAllClicks: {
    params: '--forward-all-clicks',
    type: ATTACH_PARAMS_TYPE.ADD
  },
  noKeyRepeat: {
    params: '--no-key-repeat',
    type: ATTACH_PARAMS_TYPE.ADD
  },
}
