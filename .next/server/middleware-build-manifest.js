self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/admin/products/new": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/admin/products/new.js"
    ],
    "/colour-visualiser": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/colour-visualiser.js"
    ],
    "/colour-visualiser/advanced": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/colour-visualiser/advanced.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];