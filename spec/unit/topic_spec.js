const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
     this.topic;
     this.post;
     this.user;

     sequelize.sync({force: true}).then((res) => {

       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe"
       })
       .then((user) => {
         this.user = user; //store the user

         Topic.create({
           title: "Expeditions to Alpha Centauri",
           description: "A compilation of reports from recent visits to the star system.",

           posts: [{
             title: "My first visit to Proxima Centauri b",
             body: "I saw some rocks.",
             userId: this.user.id
           }]
         }, {

           include: {
             model: Post,
             as: "posts"
           }
         })
         .then((topic) => {
           this.topic = topic; //store the topic
           this.post = topic.posts[0]; //store the post
           done();
         })
       })
     });
   });

  describe("#create()", () => {

    it("should create a topic and store it in the database", (done) => {

      Topic.create({
        title: "Expeditions to Sirius",
        description: "A compilation of reports from recent visits to this star system."
      })
      .then((topic) => {

        expect(topic.title).toBe("Expeditions to Sirius");
        expect(topic.description).toBe("A compilation of reports from recent visits to this star system.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic without a title or description", (done) => {
      Topic.create({
        title: "Expeditions to Sirius",
        description: "A compilation of reports from recent visits to this star system."
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {

        expect(err.message).toContain("Topic.title cannot be null");
        expect(err.message).toContain("Topic.description cannot be null");
        done();

      })
    });

  });

  describe("#getPosts()", () => {

    it("should create a new post and associate it with the topic in scope", (done) => {

      Post.create({
        title: "Expedition Number One to Alpha Centauri",
        body: "A report about my recent visit to Alpha Centauri.",
        topicId: this.topic.id,
        userId: this.user.id
      })
      .then((newPost) => {
        expect(newPost.topicId).toBe(this.topic.id);
        expect(newPost.userId).toBe(this.user.id);
        done();

      })
    });

  });

});
