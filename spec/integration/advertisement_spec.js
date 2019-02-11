const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

  beforeEach((done) => {
    this.Advertisement;
    sequelize.sync({force: true}).then((res) => {

      Advertisement.create({
        title: "Advertisement",
        description: "An advertisement"
      })
      .then((advertisement) => {
        this.advertisement = advertisement;
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
        expect(body).toContain("Advertisement");
        expect(body).toContain("An advertisement");
        done();
      });
    });

    describe("GET /advertisements/new", () => {

      it("should render a new advertisement form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Advertisement");
          done();
        });
      });

    });

    describe("POST /advertisement/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "new Coca-Cola advertisement",
          description: "buy some Coca-Cola"
        }
      };

      it("should create a new advertisement and redirect", (done) =>{

        request.post(options,
          (err, res, body) => {
            Advertisement.findOne({where: {title: "new Coca-Cola advertisement"}})
            .then((advertisements) => {
              expect(res.statusCode).toBe(303);
              expect(Advertisement.title).toBe("new Coca-Cola advertisement");
              expect(Advertisement.description).toBe("buy some Coca-Cola");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });
/*
    describe("GET /advertisement/:id", () => {

      it("should render a view with the selected advertisement", (done) => {
        request.get(`{base}${this.advertisement.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Advertisement 1");
          done();
        });
      });

    });

    describe("POST /advertisement/:id/destroy", () => {

      it("should delete the advertisement with the associated ID", (done) => {
        Advertisement_1.all()
        .then((topics) => {
          const advertisementCountBeforeDelete = advertisement.length;
          expect(advertisementCountBeforeDelete).toBe(1);
          request.post(`{base}${this.advertisement.id}/destroy`, (err, res, body) => {
            Advertisement_1.all()
            .then((advertisement) => {
              expect(err).toBeNull();
              expect(advertisement.length).toBe(advertisementCountBeforeDelete - 1);
              done();
            })

          });
        });

      });

    });

    describe("GET /advertisement/:id/edit", () => {

      it("should render a view with an edit advertisement form", (done) => {
        request.get(`${base}${this.topic.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Advertisement");
          expect(body).toContain("Advertisement 1");
          done();
        });
      });

    });
*/
  });
});
