<<<<<<< HEAD
if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const f=e=>a(e,i),o={module:{uri:i},exports:t,require:f};s[i]=Promise.all(n.map((e=>o[e]||f(e)))).then((e=>(c(...e),t)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/250-9606defde72191c0.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/27ce9e75-3ac08b3bc1aafed5.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/45495e7f-0c88dc8256ef1748.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/468-3ec8ef06cbd0ee89.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/504-e81b38818966d5c9.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/617eee02-7cea026a66591be7.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/7094ddb0-5452075552ffc359.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/76d77505-20f58302f450ac2e.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/7e12a25d-10d98709adda1224.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/checkbox/page-f00699970d68ed1a.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/error-9b30d831a5782500.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/layout-1ad15f8ef95c2094.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/livestream/page-33ae72405c5f0034.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/loading-652892c071f0ca2c.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/not-found-2aed438312d019bc.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/app/page-a66ff3d19072848a.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/fd9d1056-550a45f0827ae9aa.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/ff716bb2-c1eba173b768fe2d.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/framework-b370f160bb96059c.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/main-6ae4b0974216e525.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/main-app-e0804c9d4920acc1.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/pages/_app-d21e88acd55d90f1.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/pages/_error-d6107f1aac0c574c.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d71d3006c0055e5a.js",revision:"f-zpYRxs_oEfk0uCAbFNz"},{url:"/_next/static/css/0d5e257bb7d66c0c.css",revision:"0d5e257bb7d66c0c"},{url:"/_next/static/css/7199a355d4067a3d.css",revision:"7199a355d4067a3d"},{url:"/_next/static/css/f2e6c5a89d035310.css",revision:"f2e6c5a89d035310"},{url:"/_next/static/f-zpYRxs_oEfk0uCAbFNz/_buildManifest.js",revision:"d8963c6657102db1f2fa51dc81a43a6f"},{url:"/_next/static/f-zpYRxs_oEfk0uCAbFNz/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/cooking.jpg",revision:"85100c6c36b07425a34796acffbb1e4a"},{url:"/icon512_maskable.png",revision:"340e79a33035df2f773a9de2387e9e48"},{url:"/icon512_rounded.png",revision:"8f35d9d29a7a410b9ff54a09b7015a77"},{url:"/manifest.json",revision:"69004dbc248ab6056de81a5cc9ca9256"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
    let registry = {};
  
    // Used for `eval` and `importScripts` where we can't get script URL by other means.
    // In both cases, it's safe to use a global var because those functions are synchronous.
    let nextDefineUri;
  
    const singleRequire = (uri, parentUri) => {
      uri = new URL(uri + ".js", parentUri).href;
      return registry[uri] || (
        
          new Promise(resolve => {
            if ("document" in self) {
              const script = document.createElement("script");
              script.src = uri;
              script.onload = resolve;
              document.head.appendChild(script);
            } else {
              nextDefineUri = uri;
              importScripts(uri);
              resolve();
            }
          })
        
        .then(() => {
          let promise = registry[uri];
          if (!promise) {
            throw new Error(`Module ${uri} didn’t register its module`);
          }
          return promise;
        })
      );
    };
  
    self.define = (depsNames, factory) => {
      const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
      if (registry[uri]) {
        // Module is already loading or loaded.
        return;
      }
      let exports = {};
      const require = depUri => singleRequire(depUri, uri);
      const specialDeps = {
        module: { uri },
        exports,
        require
      };
      registry[uri] = Promise.all(depsNames.map(
        depName => specialDeps[depName] || require(depName)
      )).then(deps => {
        factory(...deps);
        return exports;
      });
    };
  }
  define(['./workbox-7144475a'], (function (workbox) { 'use strict';
  
    importScripts();
    self.skipWaiting();
    workbox.clientsClaim();
    workbox.registerRoute("/", new workbox.NetworkFirst({
      "cacheName": "start-url",
      plugins: [{
        cacheWillUpdate: async ({
          response: e
        }) => e && "opaqueredirect" === e.type ? new Response(e.body, {
          status: 200,
          statusText: "OK",
          headers: e.headers
        }) : e
      }]
    }), 'GET');
    workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
      "cacheName": "dev",
      plugins: []
    }), 'GET');
    self.__WB_DISABLE_DEV_LOGS = true;
  
  }));
  //# sourceMappingURL=sw.js.map
  
>>>>>>> ab2259d13706b9ad0723d0a382b7be5598355ae7
