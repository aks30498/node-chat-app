const expect = require('expect');
var {generateMessage} = require("./message.js");

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
