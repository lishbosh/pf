import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myportfolio.app',
  appName: 'portfolio-app',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    iosScheme: 'https',
    cleartext: false,
    url: 'index.html'  // Explicitly load local index.html
  },
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config; // Explicitly load local index.html
  },
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;