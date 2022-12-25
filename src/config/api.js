//COINS URL :
export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

//NFTS URLS:
export const NFTsList = (currency) =>
  `https://api.coingecko.com/api/v3/nfts/list`;
export const SingleNFT = (id) => `https://api.coingecko.com/api/v3/nfts/${id}`;

//Indexes URLS:
export const IndexLists = () => `  https://api.coingecko.com/api/v3/indexes`;
//Unused:!
export const SingleIndex = (market_id, id) =>
  `https://api.coingecko.com/api/v3/indexes/${market_id}/${id}`;

//E xchanges urls:
export const ExchangeLists = () => `https://api.coingecko.com/api/v3/exchanges`;
export const SingleExchange = (id) =>
  `https://api.coingecko.com/api/v3/exchanges/${id}`;

//Unused!
export const HistoricalExchange = (id, days = 365) =>
  `https://api.coingecko.com/api/v3/exchanges/${id}/volume_chart?${days}`;
