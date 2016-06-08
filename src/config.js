export default {
  // ==============================
  // The API Host
  // ==============================
  api: process.env.API || 'http://api.gocart.ph',

  // ==============================
  // Assets
  // ==============================
  //
  // Configuration for assets and paths
  //
  assets: {
    images: process.env.ASSET_IMAGE_PATH || '/img'
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
  }
};
