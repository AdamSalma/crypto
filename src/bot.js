export default class Bot {
    constructor({ config, strategy, exchange }) {
        this.config = config
        this.strategy = strategy
        this.exchange = exchange
    }

    async start({ watch=true, pauseDuration=1000 } = {}) {
        await this.next()
        if (watch) {
            while (true) {
                await sleep(this.exchange.rateLimit);
                await this.next();
            }
        }
    }

    /**
     * Fetch data from exchange
     * Apply client strategy
     * Place order if strategy determines so.
     */
    async next() {
        console.log("Performing iteration...");
        // OHLCV: Open, High, Low, Close, Volume
        const marketData = await this.exchange.fetchOHLCV(this.config.exchange.currency);

        const order = this.strategy.apply(marketData);
        if (order) {
            this.exchange
                .placeOrder(order)
                .then(() => console.log("Order placed: ", order))
        }

    }
}


