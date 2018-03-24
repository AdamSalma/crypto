import ccxt from "ccxt";

/**
 * This class is an abstraction of the CCXT library
 *
 * One thing this enables: adding DB interaction
 * before fetching from the exhange.
 * That way we can build up our own data store
 */
export default class Exchange {
    constructor(config) {
        this.api = new ccxt[config.exchange.id]();
        this.config = config
    }

    loadSomething() {
        /**
         * Heres what we could do:
         *

            db.getSomething()

            if (nothingExistsInDB)
               fetchFromApi()
               storeInDB()
               return theApiResult
            else
               return theDbResult

         */

        return this.api.loadSomething(...arguments);
    }

    fetchOHLCV() {
        return this.api.fetchOHLCV(...arguments);
    }
}


// FOR CCXT REFERENCE:   https://github.com/ccxt/ccxt/wiki/Manual#api-methods--endpoints