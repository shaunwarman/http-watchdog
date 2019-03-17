const delay = require('delay');
const request = require('got');
const debug = require('debug')('watchdog');

class Watchdog {
  constructor(options) {
    debug('options: %O', options);

    const {
      delay = 0,
      failureCount = 3,
      interval = 5000,
      logger = console,
      healthcheck,
      timeout = 1000
    } = options;

    if (!healthcheck) {
      throw new Error('options.healthcheck must be configured!');
    }

    this.delay = delay;
    this.failures = 0;
    this.failureCount = failureCount;
    this.interval = interval;
    this.healthcheck = healthcheck;
    this.logger = logger;
    this.timeout = timeout;
  }

  async watch() {
    if (this.delay) {
      await delay(this.delay);
    }

    this.watcher = setInterval(async () => {
      debug('polling');
      try {
        const response = await request(this.healthcheck, {
          timeout: this.timeout
        });
        debug('response: %O', response.statusCode);
      } catch (err) {
        this.failures++;
        debug('failure polling: %s', this.failures);
        if (this.failures === this.failureCount) {
          this.alert();
          this.failures = 0;
        }
      }
    }, this.interval);
  }

  alert() {
    const msg = `Application alert! Failed to request the application ${
      this.failureCount
    } consecutive times!`;

    this.logger.error(msg);
  }

  stop() {
    debug('stopping watchdog');
    clearInterval(this.watcher);
  }
}

module.exports = Watchdog;
