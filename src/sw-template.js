/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


// Estilos
registerRoute(
  new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
  new CacheFirst()
)

registerRoute(
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
  new CacheFirst()
)


// Cache de token
registerRoute(
  new RegExp('http://localhost:4000/api/auth/renew'),
  new NetworkFirst()
)

// Obtener eventos
registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkFirst()
)

// Creacion de eventos

const bgSyncPlugin = new BackgroundSyncPlugin('createEvents', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

// Actualizacion de eventos
registerRoute(
  new RegExp('http://localhost:4000/api/events/*'),
  new NetworkFirst({
    plugins: [bgSyncPlugin]
  }),
  'PUT',
)

// Borrado de eventos
registerRoute(
  new RegExp('http://localhost:4000/api/events/*'),
  new NetworkFirst({
    plugins: [bgSyncPlugin]
  }),
  'DELETE',
)