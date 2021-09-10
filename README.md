# RahiTheTraveler

A travel application that fetches multiple data from different APIs (data sources) namely, weather, location, destination image and destination's country information like it's capital, currency and language. It also helps user manage their packing list and tickets for their trip. As per project requirement, if the trip is within a week, current weather is displayed else next week's forecasted weather is displayed. Backdrop image assets are created to match the color theme of the application using [Canva](https://www.canva.com/).

## Application Preview for Saved Trips

https://user-images.githubusercontent.com/29170466/132299435-5c4666d0-07d9-432d-af30-c1ee1656ffb9.mov


## Software, Firmware and Hardware

* HTML, CSS, JavaScript
* NodeJS v14.17.3 and latest version of following packages:
  * express, body-Parser, cors, dotenv
  * babel, sass-loader, css-loader, style-loader, mini-css-extract
  * clean-webpack, html-webpack
  * node-fetch
  * jest, webpack, workbox
  * css-minimizer, terser


## Installation instructions

* Install [NodeJS](https://nodejs.org/)
* Download the application locally
* On terminal, `cd` to the main application folder containing `package.json` and install dependencies by running `npm install`


## Application access

* **Test Application**: To run the Jest Tests, run command `npm run test` from the main application folder (containing `package.json`)

* **Development Mode**: To run application in Development Mode, run following commands (in separate terminal windows) from the main application folder (containing `package.json`):
  ```
  npm run dev
  npm run server
  ```
  DevServer should automatically spins the application at http://localhost:9090/. It is configured to proxy to Express Server listening at 8080 to serve API data requests.

  *Note*: Webpack dev server does NOT create/write static files in `dist`, it serves the bundle virtually from the memory. `dist` if already created, will be empty in the development mode. [Read more](https://stackoverflow.com/questions/48936567/webpack-dev-server-does-not-place-bundle-in-dist)

* **Prod mode**: To run application in Production Mode, run following commands (in separate terminal windows) from the main application folder (containing `package.json`):
  ```
  npm run prod
  npm run server
  ```
  Initiate the application manually using url http://localhost:8080/

  *Note*: Webpack will write static files in `dist`. `dist` will be created with required webpack bundle files.


## Folder Structure

* main
  * README.md - Read me file
  * .gitignore - Files that were ignored in commit
  * package.json - Contains list of installable dependencies needed to run the application locally
  * dist - Contains webpack bundle files in prod mode
  * webpack.config.js - Contains Webpack dev/prod configurations
  * src/server
    * server.js - Server side scripting to handle API requests asynchronously
    * server-objects.js - App specific data objects used by server
  * src/client
    * assets/* - Images used in the application
    * jest-test/*.js - JS components test scripts
    * js/app.js - Client side scripting
    * js/components/*.js - Scripting components of the application
    * styles/*.scss - Styling scripts used in the application
    * views/index.html - Landing page of the application
    * index.js - Entry file of the application

## Copyright

The application is designed and developed by **Nimisha Viraj** as a part of [Udacity Front End Web Developer Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011).


## Acknowledgements

* [Udacity](https://udacity.com) - Source of application requirements
* [Canva](https://www.canva.com/) - Tool used to create app color themed Assets/Images
* [FontAwesome](https://fontawesome.com/) - Source of Icons
* [GoogleFonts](https://fonts.google.com/) - Source of fonts
* [Geonames](http://www.geonames.org/) - Source of Locations' API Data
* [Weatherbit](https://www.weatherbit.io/) - Source of Weather API Data
* [Pixabay](https://pixabay.com/) - Source of Locations' Pictures API Data
* [RestCountries](https://restcountries.eu/) - Source of Countries Information API Data
* [Stackoverflow](https://stackoverflow.com/) - Source of resolutions to coding errors and roadblocks


## Limitation and Scope

* Service worker implementation impacts the overall speed of the Application. It is also seen crashing application due to their ongoing bug [1790](https://github.com/GoogleChrome/workbox/issues/1790)
* Fetching Api data is taking approx 12-15 secs to display Result/Error, Loading is displayed.
* Application can be expanded to provide more destination specific information like Point of Interests and offer more managing options like storing info of hotels or via trips.
