# NodeJS Challenge
Carlos Sesma - carlos.sesma@gmail.com

Public API REST thet retrieves the market prices for trading paris.

## Starting the API

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm start
```

## Example calls
Orderbook for pair BTC-USD
```sh
http://localhost:3000/api/v1.0/orderbook?pair=BTC-USD
```
Estimate BUY price for 1 ETH-USD
```sh
http://localhost:3000/api/v1.0/quote?pair=ETH-USD&type=SELL&amount=1
```