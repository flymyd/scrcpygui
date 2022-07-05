export class OSUtils {
  private os = require('os');
  getBasicInfo() {
    return {
      hostName: this.os.hostname(),
      osType: this.os.type(),
      archType: this.os.arch(),
      osPlatform: this.os.platform(),
    }
  }
  getNetworkInterfaces() {
    return this.os.networkInterfaces();
  }
  getRunDir() {
    return __dirname;
  }
}