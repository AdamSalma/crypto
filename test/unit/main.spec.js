const { Bot, botFactory, Exchange, Strategy } = SourceCode;


describe('Bot', () => {

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

    it('should instanciate', () => {
        const exchange = new Exchange(config);
        const strategy = new Strategy(config);
        new Bot({exchange, strategy, config});
    });

    it('should create bot from botFactory', () => {
        const bot = botFactory(config);
    });

    it('should iterate on market data once', async () => {

        const bot = botFactory(config);

        await bot.next();
    })
});
