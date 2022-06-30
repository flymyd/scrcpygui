export class OSUtils {
  private os = require('os');
  getBasicInfo() {
    return {
      hostName: this.os.hostname(),
      osType: this.os.type(),
      archType: this.os.arch(),
      buildOS: this.os.platform(),
    }
  }
  getNetworkInterfaces() {
    return this.os.networkInterfaces();
  }
  getRunDir() {
    return __dirname;
  }
}