import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myportfolio.app',
  appName: 'portfolio-app',
  webDir: 'out',
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;