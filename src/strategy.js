/**
 * This class represents a bots trading approach to the market.
 *
 * Implementation details WIP
 */

export default class Strategy {
  constructor(config) {
    this.config = config;
  }

  apply(marketData) {
    /**
     * Something like this?
     */

    const marketReport = this._generateMarketReport(marketData);

    switch (marketReport.state) {
      case "LOW_PRICE":
        return this._determineBuyStrategy(marketReport);

      case "HIGH_PRICE":
        return this._determineSellStrategy(marketReport);
    }
  }

  /**
   * This would do initial calculations and trend analysis
   * on the market and determine if the realtime price is
   * low or high
   *
   * Then we can use the users config to determine buy/sell amount
   */
  _generateMarketReport(marketData) {
    return {
      state: "LOW_PRICE"
    };
  }

  _determineBuyStrategy(report) {}
  _determineSellStrategy(report) {}

}