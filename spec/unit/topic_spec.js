const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

    Topic.create({
      title: "Expeditions to Alpha Centauri",
      description: "A compilation of reports from recent visits to the star system."
    })
    .then((topic) => {
      this.topic = topic;

      Post.create({
        title: "My first visit to Prozima Centauri b",
        body: "I saw some rocks.",
        topicId: this.topic.id
      })
      .then((post) => {
        this.post = post;
        done();
      });
    })
    .catch((err) => {
      console.log(err);
      done();
    });
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
        topicId: this.topic.id
      })
      .then((newPost) => {
        expect(newPost.topicId).toBe(this.topic.id);
        done();

      })
    });

  });

});
