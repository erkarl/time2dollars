# Time to Dollars
[![Build Status](https://travis-ci.org/erkarl/time2dollars.svg?branch=master)](https://travis-ci.org/erkarl/time2dollars)

Easily convert time into dollars based on hourly rate. Live example available at [timetodollars.xyz](http://timetodollars.xyz/)

### Install
```
npm install
```

### Usage

#### Start development server

```
npm start
```

Navigate to `http://localhost:8080/`

#### Tests

##### Test server for development
```
npm run test:server
```

Navigate to `http://localhost:9876/`

##### Test server for headless development
```
npm run test:server:headless
```

##### Run tests once headlessly (for CI)
```
npm test
```

#### Build for production
```
npm run build
```

Builds production ready assets into `build` folder.

### License
This project is licensed under the [MIT License](LICENSE).
