const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

 new() {
   return (this._isMember() || this._isAdmin() || this._isOwner());
 }

 create() {
   return this.new();
 }

 edit() {
   return this._isAdmin();
 }

 update() {
   return this.edit();
 }

 destroy() {
   return this.update();
 }
}
