const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.post;
    this.flair;
    sequelize.sync({force: true}).then((res) => {

      Post.create({
        title: "My first visit to Proxima Centauri b",
        body: "I saw some rocks."

      })
      .then((post) => {
        this.post = post;
        done();

        Flair.create({
          name: "Magnus",
          color: "black",

          postId: this.post.id
        })
        .then((flair) => {
          this.flair = flair;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    describe("#create()", () => {

     it("should create a flair object with a name, color, and an assigned post", (done) => {
       Flair.create({
         name: "Cory",
         color: "orange",
         postId: this.post.id
       })
       .then((flair) => {

         expect(flair.name).toBe("Cory");
         expect(flair.color).toBe("orange");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });

   });

  });
});
