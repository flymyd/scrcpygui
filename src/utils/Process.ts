export class Process {
  execFileFunc: any;
  execFunc: any;
  worker: any;
  constructor() {
    this.execFunc = require('child_process').exec;
    this.execFileFunc = require('child_process').execFile;
  }
  callbackSettings(options: ProcessOptions) {
    if (options.stdout && typeof options.stdout == "function") {
      this.worker.stdout.on('data', options.stdout);
    }
    if (options.stderr && typeof options.stderr == "function") {
      this.worker.stderr.on('data', options.stderr);
    }
    if (options.close && typeof options.close == "function") {
      this.worker.on('close', options.close);
    }
  }
  exec(options: ProcessOptions) {
    this.worker = this.execFunc(options.cmd)
    this.callbackSettings(options)
  }
  execFile(options: ProcessOptions) {
    if (typeof options.args == "undefined") {
      this.worker = this.execFileFunc(options.cmd)
    } else {
      this.worker = this.execFileFunc(options.cmd, options.args)
    }
    this.callbackSettings(options)
  }
}

interface ProcessOptions {
  cmd: string,
  args?: Array<string | number>,
  close?: Function,
  stdout?: Function,
  stderr?: Function,
}