import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Coin from './Components/Coin';
import './App.css';
function App() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0")
      .then((response) => {
        setCoins(response.data.coins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = coins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCoins(filteredCoins);
    setCurrentPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>CoinGo</h1>
      </header>
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Search Bitcoin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="cryptoDisplay">
        {currentCoins.map((coin) => (
          <Coin
            key={coin.id}
            icon={coin.icon}
            name={coin.name}
            price={coin.price}
            symbol={coin.symbol}
          />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(coins.length / coinsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default App;
