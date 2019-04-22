const expect = require('expect');
var {Users} = require('./users.js');

var user;

beforeEach(() => {
    user = new Users();
    user.users = [{
      id: 1,
      name: "Dema",
      room: "Stupidity"
    },{
      id: 2,
      name: "Tu",
      room: "Stupidity"
    },{
      id: 3,
      name: "Cosita",
      room: "Stupidity++"
    }]
})

describe("Users", () => {
  it("Should add a new user", ()=> {
    var user = new Users();
    var newUser = {
      id: 123,
      name: "Name",
      room: "Room"
    };
    var res = user.addUser(newUser.id, newUser.name, newUser.room);
    expect(user.users.length).toBe(1);
    expect(user.users[0]).toMatchObject(newUser);
  });

  it("Should return users for stupidity", () => {
    var list  = user.getUserList("Stupidity");
    expect(list).toEqual(['Dema','Tu']);
  })

  it("Should return users for stupidity++", () => {
    var list  = user.getUserList("Stupidity++");
    expect(list).toEqual(['Cosita']);
  });

  it("Should find user if correct id", ()=> {
    var id=1;
    var foundUser = user.getUser(id);
    expect(foundUser.id).toBe(id);
  });

  it("Should not find user if not a correct id", ()=> {
    var id=4;
    var foundUser = user.getUser(id);
    expect(typeof foundUser).toBe("undefined");
  });

  it("Should remove a user if id is correct", () => {
    var id = 1;
    var removedUser = user.removeUser(id);

    expect(removedUser.id).toBe(1);
    expect(user.users.length).toBe(2);
  });

  it("Shouldn't remove a user if id is incorrect", () => {
    var id = 4;
    var removedUser = user.removeUser(id);

    expect(user.users.length).toBe(3);
  });

})
