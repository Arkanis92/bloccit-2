const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement_1 = require("../../src/db/models").Advertisement_1;

describe("routes : advertisement", () => {

  beforeEach((done) => {
    this.Advertisement_1;
    sequelize.sync({force: true}).then((res) => {

      Advertisement_1.create({
        title: "Advertisement 1",
        description: "An advertisement"
      })
      .then((Advertisement_1) => {
        this.Advertisement_1 = Advertisement_1;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });

  describe("GET /advertisement", () => {

    it("should return a status code 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull;
        expect(body).toContain("Advertisement_1");
        expect(body).toContain("Advertisement 1");
        done();
      });
    });

  });
});
