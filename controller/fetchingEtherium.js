const web3Model = require("../model/fetchingEthereum");
const axios = require("axios");

const fetchEtherium = async function (req, res) {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
      }
    );

    const ethereumPrice = response.data.ethereum.usd;
    let obj = {
      ethereumPrice: ethereumPrice,
    };
    await web3Model.create(obj);
    return res
      .status(200)
      .send({ status: true, msg: "Etherium price: $" + ethereumPrice });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports = { fetchEtherium };
