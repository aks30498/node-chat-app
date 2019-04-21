const expect = require('expect');
var {generateMessage,generateLocationMessage} = require("./message.js");

describe('Generate message', () => {
  it("Generates a new message with given parameters", () => {
    var message = generateMessage("Laddu", "OK");

    expect(message).toMatchObject({
      from: "Laddu",
      text: "OK"
    });
    expect(typeof message.createdAt).toBe("number");
  });
});

describe('Generate locationMessage', () => {
  it("Generates a correct location object", () => {
    var lat = 20.00;
    var long = 20.00;
    var message = generateLocationMessage("Admin",lat,long);

    expect(message).toMatchObject({
      from: "Admin",
      url: `https://www.google.com/maps?q=${lat},${long}`
    });
    expect(typeof message.createdAt).toBe("number");
  });
});
