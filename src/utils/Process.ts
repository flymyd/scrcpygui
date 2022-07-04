import {mySettingsStore} from "@/store";

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
        options.cmd = userPathFix(options.cmd)
        this.worker = this.execFunc(options.cmd)
        this.callbackSettings(options)
    }

    execFile(options: ProcessOptions) {
        options.cmd = userPathFix(options.cmd)
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

function userPathFix(cmd: string) {
    const mySettings = mySettingsStore();
    if (cmd.indexOf('adb') === 0) {
        const fixed = mySettings.adbPath ? mySettings.adbPath : 'adb';
        cmd = cmd.replace('adb', fixed)
    } else if (cmd.indexOf('scrcpy') === 0) {
        const fixed = mySettings.scrcpyPath ? mySettings.scrcpyPath : 'scrcpy';
        cmd = cmd.replace('scrcpy', fixed);
    }
    return cmd;
}