// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

import './styles/style.scss';
import * as AppEventListeners from './js/components/event-listeners.js';
import * as AppAssetLoaders from './js/components/images.js';
import { addHeroEventListeners, addTripModalEventListeners, loadSavedTrips } from './js/app.js';

// Navbar Event Listeners
AppEventListeners.navbarEventsOnScroll();
AppEventListeners.navbarEventsOnClick();
AppEventListeners.navbarBackgroundChangeOnScroll();

// Load Event Listeners
addHeroEventListeners();
addTripModalEventListeners();

// Load Saved Trips
loadSavedTrips();

// Static Asset Loader
AppAssetLoaders.loadNavStaticAssets();
AppAssetLoaders.loadSearchStaticAssets();
AppAssetLoaders.loadSavedTripStaticAsset();
AppAssetLoaders.loadAboutUsStaticAsset();

// ----------------------------------------------------------------------------
// Register Service Worker
// ----------------------------------------------------------------------------

// const devMode = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';
// if ('serviceWorker' in navigator) {
//   window.addEventListener("load", () => {
//     if (!navigator.serviceWorker.getRegistrations().length) {
//       console.log('Registering Service Worker');
//       navigator.serviceWorker.register('service-worker.js')
//         .then(registration => {
//           console.log('SW registered: ', registration);
//         })
//         .catch(registrationError => {
//           console.log('SW registration failed: ', registrationError);
//         });
//     }
//   });
// }
