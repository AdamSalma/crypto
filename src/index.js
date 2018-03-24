/**
 * Packages everything up so it can be imported easily by tests
 */
import { default as Bot } from './bot'
import { default as Exchange } from './exchange'
import { default as Strategy } from "./strategy";


export { Bot, Exchange, Strategy }


/**
 * This is a helper that injects the bot with its dependencies.
 */
import ccxt from 'ccxt';

export const botFactory = (config) => {
    const strategy = new Strategy(config);
    const exchange = new Exchange(config);

    return new Bot({ config, strategy, exchange });
}