const Watchdog = require('..');

process.env.DEBUG = 'watchdog';

const watchdogA = new Watchdog({
  healthcheck: 'http://localhost:3000/good'
});

const watchdogB = new Watchdog({
  healthcheck: 'http://localhost:3000/bad',
  logger: () => {
    console.error('testing');
  }
});

watchdogA.watch();
watchdogB.watch();

setTimeout(() => {
  watchdogA.stop();
  watchdogB.stop();
  process.exit(0);
}, 30000);
