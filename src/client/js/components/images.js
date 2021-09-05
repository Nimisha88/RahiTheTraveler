import appIcon from '../../assets/app-icon.png';
import appLogo from '../../assets/app-logo.png';
import appHero from '../../assets/app-hero.png';
import lpBackdrop from '../../assets/lp-backdrop.png';
import locFallbackImg from '../../assets/location-fallback.jpeg';
import savedTripBackdrop from '../../assets/saved-trip-backdrop.png';
import aboutUsBackdrop from '../../assets/about-us-backdrop.png';
import rahiImg1 from '../../assets/1.png';
import rahiImg2 from '../../assets/2.png';
import rahiImg3 from '../../assets/3.png';
import rahiImg4 from '../../assets/4.png';
import rahiImg5 from '../../assets/5.png';
import rahiImg6 from '../../assets/6.png';
import rahiImg7 from '../../assets/7.png';
import rahiImg8 from '../../assets/8.png';
import rahiImg9 from '../../assets/9.png';
import rahiImg10 from '../../assets/10.png';

const appIconEle = document.querySelector('.app-icon');
const appLogoEle = document.getElementById('app-logo');
const backdropImgEle = document.querySelector('.page.img-backdrop');
const heroImgEle = document.querySelector('.hero-img.img-backdrop');
const locationImgEle = document.getElementById('loc-img');
const savedTripBackdropEle = document.querySelector('.saved-trips.img-backdrop');
const aboutUsBackdropEle = document.querySelector('.about-us.img-backdrop');
const carouselImgEle = document.querySelector('.about-us.image');

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
  let carouselImages = [];

  aboutUsBackdropEle.src = aboutUsBackdrop;

  try {
    carouselImages.push(rahiImg1);
    carouselImages.push(rahiImg2);
    carouselImages.push(rahiImg3);
    carouselImages.push(rahiImg4);
    carouselImages.push(rahiImg5);
    carouselImages.push(rahiImg6);
    carouselImages.push(rahiImg7);
    carouselImages.push(rahiImg8);
    carouselImages.push(rahiImg9);
    carouselImages.push(rahiImg10);
  }
  catch(error) {
    carouselImgEle.src = rahiImg7;
  }

  if(!carouselImages.length) {
    return;
  }

  let looper = 0;
  setInterval(() => {
    carouselImgEle.src = carouselImages[looper++ % carouselImages.length];
  }, 3000);
}

const loadBookmarkFallbackAsset = (tripId) => {
  document.querySelector(`.bm-image.${tripId}`).src = locFallbackImg;
}

export { loadNavStaticAssets, loadSearchStaticAssets, loadModalFallbackAsset, loadSavedTripStaticAsset, loadBookmarkFallbackAsset, loadAboutUsStaticAsset }
