import { ArgsInterface } from "./Options";

const exec = require('child_process').exec;
export function start(workDir: string='') {
  let scrcpyWorker;
  runExec({
    streaming: {
      reduceSize: 800,
      changeBitRate: '2M',
      maxFps: 5
    }
  });

  function runExec(args?: ArgsInterface) {
    scrcpyWorker = exec(`${workDir}scrcpy -m ${args?.streaming?.reduceSize} -b ${args?.streaming?.changeBitRate} --max-fps ${args?.streaming?.maxFps}`)
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