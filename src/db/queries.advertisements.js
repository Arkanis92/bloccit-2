const Advertisement_1 = require("./models").Advertisement_1;

module.exports = {

  getAllAdvertisements(callback){
    return Advertisement_1.all()

    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
