# RahiTheTraveler

A travel application that uses multiple types of data, from different APIs (data sources) namely, weather, location co-ordinates, destination images and Rest Countries

## Application Preview



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
* Download the application locally and do the following:
  * Obtain an APIKey at [Geonames]() by creating a free account.
  * Obtain an APIKey at [Weatherbit]() by creating a free account.
  * Obtain an APIKey at [Pixabay]() by creating a free account.
  * In the main application folder, create `.env` file and add your APIKey like
    ```
    APIKeyWeatherbit=your-api-key-here
    APIKeyGeonames=your-api-key-here
    APIKeyPixabay=your-api-key-here
    ```
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
* [Canva]()
* []() - Source of API Data
* [Stackoverflow](https://stackoverflow.com/) - Source of resolutions to coding errors and roadblocks


## Limitation and Scope

* Service worker implementation impacts the overall speed of the Application
* Fetching Api data is taking approx 12-15 secs to display result/error.
* 
