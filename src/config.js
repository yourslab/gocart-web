export default {
  // ==============================
  // The API Host
  // ==============================
  api: process.env.API || 'https://api.gocart.ph',

  // ==============================
  // Assets
  // ==============================
  //
  // Configuration for assets and paths
  //
  assets: {
    images: process.env.ASSET_IMAGE_PATH || '/img',

    // S3 Base URL
    s3: 'https://s3-ap-southeast-1.amazonaws.com/gocartphotos'
  },

  // ==============================
  // App-related configuration
  // ==============================
  app: {
    title: 'Gocart | Social Media Meets E-commerce'
  },

  auth: {
    key: process.env.AUTH_KEY || 'FkrSi'
  },

  facebook: {
    appId: '548682991936531'
  },

  google: {
    // @TODO: Put it up as an environment config, lol
    appKey: 'AIzaSyDrMbB6t3WJmzBR5OwpcINIKraSHt5hjS4'
  },

  routing: {
    // The query parameter key used when
    // redirecting an unauthorized user
    // e.g., ?redirect=/yolowing
    redirectKey: 'redirect'
  }
};
