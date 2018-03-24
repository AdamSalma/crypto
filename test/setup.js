import * as Src from '../src';
import chai, { expect, assert } from "chai";
import ccxt from "ccxt";

// For easy access
global.SourceCode = Src;

/**
 * Ensure environment variables are set
 */
process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';


/**
 * Setup global testing utils
 */
global.chai = chai
global.expect = expect
global.assert = assert
global.ccxt = ccxt;

/**
 * Suppresses logging in tests that pass
 */
var util = require('util');
var log = require('fs').createWriteStream('stdout.log');

console.log = console.info = function(t) {
  var out;
  if (t && ~t.indexOf('%')) {
    out = util.format.apply(util, arguments);
    process.stdout.write(out + '\n');
    return;
  } else {
    out = Array.prototype.join.call(arguments, ' ');
  }
  out && log.write(out + '\n');
};


/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on('unhandledRejection', err => {
  throw err;
});
