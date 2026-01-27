/** @param {NS} ns */
export async function main(ns) {
  let stock_symbols = ns.stock.getSymbols();
  let cycle = 0;
  let commission = 100000;

  async function stock_market() {
    ns.tprint("Stock market cycle: ", cycle);

    if (cycle % 10 === 0) {
      stock_portfolio();
    }

    let player_money = ns.getPlayer().money;

    for (let i = 0; i < stock_symbols.length; i++) {
      let stock_symbol = stock_symbols[i];
      let stock_price = price(stock_symbol);
      let shares_owned = position(stock_symbol)[0];
      let open_shares = max_shares(stock_symbol) - shares_owned;

      let min_shares = commission / (price(stock_symbol) * 0.005);
      let max_price = open_shares * stock_price;

      if (
        forecast(stock_symbol) < 0.5 &&
        shares_owned > 0 &&
        shares_owned !== undefined
      ) {
        sell(stock_symbol, shares_owned);

        ns.tprint("Sold shares of ", stock_symbol, " : ", shares_owned);
      } else if (player_money > 1000000000) {
        let money_spend = player_money * 0.3;
        if (forecast(stock_symbol) > 0.6 && open_shares >= min_shares) {
          if (max_price + commission <= money_spend) {
            buy(stock_symbol, open_shares);

            ns.tprint("Bought shares of ", stock_symbol, " : ", open_shares);
          } else if (money_spend >= min_shares * stock_price + commission) {
            let number_of_shares = money_spend / stock_price;
            buy(stock_symbol, number_of_shares);

            ns.tprint(
              "Bought shares of ",
              stock_symbol,
              " : ",
              number_of_shares
            );
          }
        }
      }
    }

    await next_update();
    cycle++;
    await stock_market();
  }

  await stock_market();

  async function next_update() {
    await ns.stock.nextUpdate();
  }

  function position(symbol) {
    return ns.stock.getPosition(symbol);
  }

  function forecast(symbol) {
    return ns.stock.getForecast(symbol);
  }
  function volatility(symbol) {
    return ns.stock.getVolatility(symbol);
  }

  function max_shares(symbol) {
    return ns.stock.getMaxShares(symbol);
  }

  function price(symbol) {
    return ns.stock.getPrice(symbol);
  }

  function buy(symbol, number_of_shares) {
    ns.stock.buyStock(symbol, number_of_shares);
  }
  function sell(symbol, number_of_shares) {
    ns.stock.sellStock(symbol, number_of_shares);
  }

  function stock_portfolio() {
    let stock_symbols = ns.stock.getSymbols();

    let player_money = ns.getPlayer().money;

    let cumulative_profit = 0;
    let cumulative_stocks_value = 0;

    for (let i = 0; i < stock_symbols.length; i++) {
      let stock_symbol = stock_symbols[i];
      let shares_owned = position(stock_symbol)[0];

      if (shares_owned > 0 && shares_owned !== undefined) {
        ns.tprint("/////////////////////////////////////////");
        ns.tprint("Stock Symbol: ", stock_symbol);

        let profit = stock_profit(stock_symbol, shares_owned, "Long");

        ns.tprint("/////////////////////////////////////////");
        ns.tprint("Shares Owned: ", shares_owned);
        ns.tprint("Average Price: ", usd(position(stock_symbol)[1]));
        ns.tprint("Profit: ", usd(profit)); //
        ns.tprint("/////////////////////////////////////////");
        ns.tprint("Forecast: ", forecast(stock_symbol));
        ns.tprint("Volatility: ", volatility(stock_symbol));
        ns.tprint("/////////////////////////////////////////");
        ns.tprint("Max Shares: ", max_shares(stock_symbol));
        ns.tprint("Open Shares: ", max_shares(stock_symbol) - shares_owned);
        ns.tprint("Price: ", usd(price(stock_symbol)));
        ns.tprint("/////////////////////////////////////////");
        ns.tprint("");

        cumulative_profit += profit;
        cumulative_stocks_value += shares_owned * price(stock_symbol);
      }
    }

    ns.tprint("/////////////////////////////////////////");
    ns.tprint("Cumulative Profit: ", usd(cumulative_profit));
    ns.tprint("");
    ns.tprint("Money: ", usd(player_money));
    ns.tprint("Cumulative Stocks Value: ", usd(cumulative_stocks_value));
    ns.tprint(
      "Money + Cumulative Stocks Value: ",
      usd(player_money + cumulative_stocks_value)
    );
    ns.tprint("/////////////////////////////////////////");

    function usd(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    }

    function stock_profit(symbol, shares_owned, position_type, commissions) {
      if (commissions != undefined) {
        return (
          (ns.stock.getPrice(symbol) - position(symbol)[1]) * shares_owned -
          commissions
        );
      } else {
        return (
          (ns.stock.getPrice(symbol) - position(symbol)[1]) * shares_owned -
          100000
        );
      }
    }
  }
}

// ns.stock.nextUpdate()
// ns.stock.getConstants();

// ns.stock.getSymbols();
// ns.stock.getPosition("symbol")

// ns.stock.getForecast("symbol")
// ns.stock.getVolatility("symbol")
// ns.stock.getMaxShares("symbol")

// ns.stock.getPurchaseCost("symbol", number_of_shares, "position_type")

// ns.stock.buyStock("symbol", number_of_shares)
// ns.stock.sellStock("symbol", number_of_shares)
// ns.stock.placeOrder("symbol", number_of_shares, price, "order_type", "position_type")

// function place_order(symbol, number_of_shares, price, order_type, position_type) { ns.stock.placeOrder(symbol, number_of_shares, price, "order_type", "position_type") }
