import ccxt from 'ccxt';

export default class CryptoBot {
    constructor(exchange, strategy, config) {
        this.exchange = exchange
        this.strategy = strategy
        this.config = config
    }

    start({ watch=true, pauseDuration=1000 } = {}) {
        this.next()
        if (watch) {
            while (true) {
                setTimeout(() => {
                    this.next();
                    this.start();
                }, this.exchange.rateLimit)
            }
        }
    }

    /**
     * Fetch relevant data
     * Apply strategy
     * Communicate with exchange if command returned
     */
    next() {
        console.log("Performing iteration");
        await marketData = this.exchange.fetchOHLCV(this.config.exchange.currency);
        const brokerCommand = this.strategy.apply(marketData);
        await succeeded = this.broker.placeOrder(brokerCommand)

        // console.log(markets);
    }

    applyStrategy(exchangeData) {

    }
}


export class Strategy {
    constructor(config) {
        this.config = config
    }

    apply(marketData) {
        const report = this._generateMarketReport( marketData )

        // Something like this?
        switch (report.type) {
            case "LOW_PRICE":
                return this._determineBuyStrategy(report)

            case "HIGH_PRICE":
                return this._determineSellStrategy(report)
        }
    }

    /**
     * Generates a market report of some sort. Returns an Object with
     * a "type" field indicating what the current trend is...
     */
    _generateMarketReport( marketData ) {
        return {
            type: "LOW_PRICE"
        }
    }
}


export class Exchange extends ccxt {
    /**
     * This class acts as an abstraction layer around the CCXT library
     *
     * We could have a DB check here that checks our db first, if nothing
     * found, it can fetch from the exchange and store it.
     *
     * That way we can build up our own data store - for future queries.
     */
    constructor(config) {
        super(config.exchange.name)
        this.config = config
    }

    loadMarkets() {
        /**
         * Example:
         *

            db.getCurrentMarkets()

            if (noDbMarkets OR dbMarketsAreOld)
               performApiFetch()
               storeInDb()
               return apiResult
            else
               return theDbResult

         */

        return super.loadMarkets.apply(null, arguments)
    }

    fetchMarkets() {
        return this.exchange.fetchMarkets.apply(null, arguments)
    }

    fetchOHLCV() {
        return this.exchange.fetchOHLCV.apply(null, arguments)
    }
}
