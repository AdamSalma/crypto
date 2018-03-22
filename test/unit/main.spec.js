import CryptoBot from '../../src/main'
import createBot from '../../src/runner'
import ccxt from 'ccxt';

import { expect } from 'chai';


const config = {
    exchange: {
        id: "gdax",
        currency: "BTC/USD",
        auth: {},
    },
    strategy: {
        buy: {
            decrease: { percent: 10 },
            within: "6 hours"
        },
        sell: {
            increase: { percent: 10 },
            within: "6 hours"
        }
    }
}



describe('CryptoBot Core', () => {

    it('Instanciates with a config strategy and exchange', () => {
        const exchange = new ccxt[config.exchange.id] ();
        const strategy = new Strategy(config);
        new CryptoBot(exchange, strategy, config);
    });


    it('createBot injects dependencies', () => {
        const bot = createBot(config);
    });

    it('Performs a single iteration', () => {
        const bot = createBot(config)

        bot.next();
    })
});
