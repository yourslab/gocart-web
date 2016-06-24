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
    title: 'GoCart',

    meta: {
      description: '',
      keywords: ''
    }
  },

  auth: {
    key: process.env.AUTH_KEY || 'FkrSi'
  },

  facebook: {
    appId: '548682991936531'
  }
};
