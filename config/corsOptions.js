const whiteList = ["https://www.google.com", "https://www.IpAdsress:8000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("You are not allowed by cors"));
    }
  },
  optionsSucessStatus: 200,
};
module.exports = corsOptions;
