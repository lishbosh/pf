import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myportfolio.app',
  appName: 'portfolio-app',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;