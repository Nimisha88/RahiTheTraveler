// import * as weatherIcons from '../../assets/icons';

import appIcon from '../../assets/app-icon.png';
import appLogo from '../../assets/app-logo.png';
import appHero from '../../assets/app-hero.png';
import lpBackdrop from '../../assets/lp-backdrop.png';
import locFallbackImg from '../../assets/location-fallback.jpeg';
import savedTripBackdrop from '../../assets/saved-trip-backdrop.png';

const appIconEle = document.querySelector('.app-icon');
const appLogoEle = document.getElementById('app-logo');
const backdropImgEle = document.querySelector('.page.img-backdrop');
const heroImgEle = document.querySelector('.hero-img.img-backdrop');
const locationImgEle = document.getElementById('loc-img');
const savedTripBackdropEle = document.querySelector('.saved-trips.img-backdrop');
const aboutUsBackdropEle = document.querySelector('.about-us.img-backdrop');

const loadNavStaticAssets = () => {
  appIconEle.href = appIcon;
  appLogoEle.src = appLogo;
}

const loadSearchStaticAssets = () => {
  backdropImgEle.src = lpBackdrop;
  heroImgEle.src = appHero;
}

const loadModalFallbackAsset = () => {
  locationImgEle.src = locFallbackImg;
}

const loadSavedTripStaticAsset = () => {
  savedTripBackdropEle.src = savedTripBackdrop;
}

const loadAboutUsStaticAsset = () => {
  aboutUsBackdropEle.src = lpBackdrop;
}

const loadBookmarkFallbackAsset = (tripId) => {
  document.querySelector(`.bm-image.${tripId}`).src = locFallbackImg;
}


export { loadNavStaticAssets, loadSearchStaticAssets, loadModalFallbackAsset, loadSavedTripStaticAsset, loadBookmarkFallbackAsset, loadAboutUsStaticAsset }
