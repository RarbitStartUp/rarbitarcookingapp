if(!self.define){let e,s={};const t=(t,i)=>(t=new URL(t+".js",i).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(i,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let c={};const r=e=>t(e,n),d={module:{uri:n},exports:c,require:r};s[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/250-9606defde72191c0.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/27ce9e75-3ac08b3bc1aafed5.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/45495e7f-0c88dc8256ef1748.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/468-3ec8ef06cbd0ee89.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/504-e7c4533d710d6631.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/617eee02-7cea026a66591be7.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/7094ddb0-5452075552ffc359.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/76d77505-20f58302f450ac2e.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/7e12a25d-10d98709adda1224.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/checkbox/page-37afa7576e653630.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/error-d4ab02ab172883bd.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/layout-d4740c1feec3eeff.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/livestream/page-6d08b170094c4f7e.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/loading-652892c071f0ca2c.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/not-found-88f7ae8887687522.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/app/page-9d358a95790a9fcb.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/fd9d1056-550a45f0827ae9aa.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/ff716bb2-c1eba173b768fe2d.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/framework-b370f160bb96059c.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/main-6ae4b0974216e525.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/main-app-d28befd34edd7ee2.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/pages/_app-d21e88acd55d90f1.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/pages/_error-d6107f1aac0c574c.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-d71d3006c0055e5a.js",revision:"pfNJ893Ai1kmdh9g5tILt"},{url:"/_next/static/css/0d5e257bb7d66c0c.css",revision:"0d5e257bb7d66c0c"},{url:"/_next/static/css/7199a355d4067a3d.css",revision:"7199a355d4067a3d"},{url:"/_next/static/css/f2e6c5a89d035310.css",revision:"f2e6c5a89d035310"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/_next/static/pfNJ893Ai1kmdh9g5tILt/_buildManifest.js",revision:"d8963c6657102db1f2fa51dc81a43a6f"},{url:"/_next/static/pfNJ893Ai1kmdh9g5tILt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/cooking.jpg",revision:"85100c6c36b07425a34796acffbb1e4a"},{url:"/icon512_maskable.png",revision:"340e79a33035df2f773a9de2387e9e48"},{url:"/icon512_rounded.png",revision:"8f35d9d29a7a410b9ff54a09b7015a77"},{url:"/manifest.json",revision:"69004dbc248ab6056de81a5cc9ca9256"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/swe-worker-development.js",revision:"259abedf6bc706df9d3a6271e0bdfd14"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:t})=>"1"===e.headers.get("RSC")&&t&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
