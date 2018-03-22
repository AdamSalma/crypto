import ccxt from 'ccxt';

/**
 * This is a wrapper that injects the bot with dependencies.
 */
const createBot = (config) => {
    const exchange = new ccxt[config.exchange.id]();
    const strategy = new Strategy(config);
    const bot = new CryptoBot(exchange, strategy, config);

    return bot
}

export default createBot
