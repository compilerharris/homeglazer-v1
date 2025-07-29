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
    "/colour-visualiser/advanced": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/colour-visualiser/advanced.js"
    ],
    "/services/customized-painting": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/services/customized-painting.js"
    ],
    "/services/painting/kids-room": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/services/painting/kids-room.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];