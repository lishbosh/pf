import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myportfolio.app',
  appName: 'portfolio-app',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    iosScheme: 'https',
    cleartext: false
  },
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;