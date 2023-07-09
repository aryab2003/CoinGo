import React from 'react';

function Coin({ name, price, symbol,icon}) {
  return (
    <div className='coin'> 
      <h1>Name: {name}</h1>
      <img src={icon}/>
      <h3>Price: {price}USD</h3>
      <h3>Symbol: {symbol}</h3>
    </div>
  );
}

export default Coin;
