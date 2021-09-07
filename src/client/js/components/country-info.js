// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Create Country Info container for a Saved Trip/Search Result
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

/* Example of Country Info
<div class="with-data country-info">
  <div class="country-info-data main">
    <h5 class="native-name text-alt">भारत</h5>
    <h1 class="country-name">India</h1>
    <h5 class="capital-name text-alt">New Delhi</h5>
  </div>
  <div class="country-info-data flag">
    <div class="modal-item-icon country-info">
      <img id="flag-img" class="" src="https://restcountries.eu/data/ind.svg" alt="Country Flag">
    </div>
  </div>
  <div class="country-info-data currency">
    <h5 class="currency-code text-alt"><span class="curr-symbol">₹</span>&nbsp;&nbsp;INR</h5>
  </div>
  <div class="country-info-data other">
    <h5 class="first-lang text-alt">हिन्दी<i class="fas fa-pencil-alt lang-icon"></i></h5>
  </div>
</div> */

export default (data = {}) => {

  try {
    let countryData = document.createElement('div');
    countryData.classList.add('with-data', 'country-info');
    let mainData = document.createElement('div');
    mainData.classList.add('country-info-data', 'main');
    let nativeName = document.createElement('h6');
    nativeName.classList.add('native-name', 'text-alt');
    nativeName.textContent = data.nativeName;
    let countryName = document.createElement('h1');
    countryName.classList.add('country-name');
    if (data.name.length <= 25) {
      countryName.textContent = data.name;
    } else {
      countryName.textContent = data.altNames[0];
      for (let altName of data.altNames) {
        if (altName.includes(' ') || altName.length > 3) {
          countryName.textContent = altName;
        }
      }
    }
    let capitalName = document.createElement('h6');
    capitalName.classList.add('capital-name', 'text-alt');
    capitalName.textContent = data.capital;

    let flagData = document.createElement('div');
    flagData.classList.add('country-info-data', 'flag');
    let modalIcon = document.createElement('div');
    modalIcon.classList.add('modal-item-icon', 'country-info');
    let flagImg = document.createElement('img');
    flagImg.id = 'flag-img';
    flagImg.src = data.flag;
    flagImg.alt = 'Country Flag'

    let currencyData = document.createElement('div');
    currencyData.classList.add('country-info-data', 'currency');
    let currencyCode = document.createElement('h6');
    currencyCode.classList.add('currency-code', 'text-alt');
    currencyCode.innerHTML = `<span class="curr-symbol">${data.currency.symbol}</span>  ${data.currency.code}`;

    let otherData = document.createElement('div');
    otherData.classList.add('country-info-data', 'other');
    let firstLang = document.createElement('h6');
    firstLang.classList.add('first-lang', 'text-alt');
    firstLang.innerHTML = `${data.firstLang.nativeName}<i class="fas fa-pencil-alt lang-icon"></i>`;

    mainData.appendChild(nativeName);
    mainData.appendChild(countryName);
    mainData.appendChild(capitalName);
    modalIcon.appendChild(flagImg)
    flagData.appendChild(modalIcon);
    currencyData.appendChild(currencyCode);
    otherData.appendChild(firstLang);

    countryData.appendChild(mainData);
    countryData.appendChild(flagData);
    countryData.appendChild(currencyData);
    countryData.appendChild(otherData);

    return countryData;
  }
  catch(error) {
    console.log('******************** Country Information is Unavailable or has Issues ******************** \n');
    return createErrorDisplay();
  }
}

const createErrorDisplay = () => {
  let errorContainer = document.createElement('div');
  errorContainer.classList.add('with-error');
  let errorText = document.createElement('h3');
  errorText.classList.add('text-alt');
  errorText.textContent = 'Country Information Unavailable ...';
  errorContainer.appendChild(errorText);
  return errorContainer;
}
