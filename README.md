# PWA

<a href='https://developers.google.com/web/tools/workbox/guides/generate-service-worker/cli'>
  Documentación
</a>

## 1 Instalación del CLI global
```
npm install workbox-cli --global
```

## 2 Generando configuración basica del CLI

```
workbox wizard
```
<ul>
  <li>
    elegimos en que carpeta se hace la compilacion (build)
  </li> 
</ul>

## 3 Configuración en el index.html

```
  <script>
      const isProduction = ('%NODE_ENV%' === 'production');
      if(isProduction && 'serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
      }
  </script>
```

## 4 Creamos el archivo de configuracioón en src/sw-template.js
```
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );
```

## 5 Creamos los archivos del Service Worker
```
workbox injectManifest
```