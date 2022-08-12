import React, { useEffect, useState } from "react";
import "../App.css";
const Crypto = () => {
  const [crypt, setCrypt] = useState([]);
  const [search, setSearch] = useState("");
  const fetchCrypData = async () => {
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    const repsone = await fetch(url);
    const data = await repsone.json();
    setCrypt(data);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let filterCrypt = crypt.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      setCrypt(filterCrypt);
    }
  };

  useEffect(() => {
    fetchCrypData();
  }, []);

  return (
    <>
      <h1 className="header">
        Get Information of your favourite Crypto currency
      </h1>
      {/* serach bar */}
      <div className="d-flex justify-content-center m-3">
        <input
          type="text"
          className="form-control"
          placeholder="search your favorite bitcoin"
          value={search}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <section className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Gain/Loss</th>
              <th scope="col">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {crypt.map((info, index) => {
              const {
                name,
                image,
                current_price,
                price_change_24h,
                market_cap_rank,
                market_cap,
              } = info;
              return (
                <tr key={index}>
                  <th scope="row">{market_cap_rank}</th>
                  <td>
                    <img src={image} alt={image} width="30px"></img>
                    <span className="mx-3 crypname">{name}</span>
                  </td>
                  <td>{`Rs ${current_price} `}</td>
                  {price_change_24h.toFixed(2) < 0 ? (
                    <td style={{ color: "red" }}>{`${price_change_24h.toFixed(
                      2
                    )}%`}</td>
                  ) : (
                    <td style={{ color: "green" }}>{`${price_change_24h.toFixed(
                      2
                    )}%`}</td>
                  )}
                  <td>{`Rs ${market_cap}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};
export default Crypto;
