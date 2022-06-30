import { ArgsInterface } from "./Declares";

const exec = require('child_process').exec;
export function start(workDir: string='') {
  let scrcpyWorker;
  runExec({
    CaptureConfig: {
      reduceSize: 800,
      changeBitRate: '2M',
      maxFps: 5
    }
  });

  function runExec(args?: ArgsInterface) {
    scrcpyWorker = exec(`${workDir}scrcpy -m ${args?.CaptureConfig?.reduceSize} -b ${args?.CaptureConfig?.changeBitRate} --max-fps ${args?.CaptureConfig?.maxFps}`)
    scrcpyWorker.stdout.on('data', function (data: String | Object) {
      console.log('stdout: ' + data)
    })
    scrcpyWorker.stderr.on('data', function (data: String | Object) {
      console.log('stderr: ' + data)
    })
    scrcpyWorker.on('close', function (code: String | Object) {
      console.log('out code：' + code)
    })
  }
}