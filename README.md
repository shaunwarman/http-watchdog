# http-watchdog

[![build status](https://img.shields.io/travis/com/shaunwarman/http-watchdog.svg)](https://travis-ci.com/shaunwarman/http-watchdog)
[![code coverage](https://img.shields.io/codecov/c/github/shaunwarman/http-watchdog.svg)](https://codecov.io/gh/shaunwarman/http-watchdog)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/shaunwarman/http-watchdog.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/http-watchdog.svg)](https://npm.im/http-watchdog)

> A simple http watchdog to monitor app health

## Overview
This watchdog is a side car container that sits next to your application process / container. The watchdog is
configured via an environment file or direct environment variables injected into the container at startup. From there, the watchdog polls the health of your application and sends alerts after a variable number of failures.

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install http-watchdog
```

[yarn][]:

```sh
yarn add http-watchdog
```

## Usage

```js
const Watchdog = require('http-watchdog');

const watchdog = new Watchdog({
  healthcheck: 'http://localhost:3000/health'
});

watchdog.watch();
```

## Options

* `delay` - (`number`, default: `0` ms) - delay before checking health (in milliseconds)
* `failureCount` - (`number`, default: `3` failures) - number of failures before sending an alert
* `interval` - (`number`, default: `5000` ms) - interval at which to poll against health check
* `healthcheck` - (`string`, default: `undefined`) - healthcheck URL to poll against (success: 200, failure: `4xx`, `5xx`)
* `logger` - (`function`, default: `null`) - A configurable logger triggered on alert
* `timeout` - (`number`, default: `1000` ms) - configurable healthcheck timeout


## Contributors

| Name             | Website                   |
| ---------------- | ------------------------- |
| **Shaun Warman** | <https://shaunwarman.com> |


## License

[MIT](LICENSE) © [Shaun Warman](https://shaunwarman.com)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
