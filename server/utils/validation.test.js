const expect = require('expect');
var {isRealString} = require("./validation.js");

describe("isRealString", () => {
  it("Returns true if type is string", ()=>{
    expect(isRealString("Laddu")).toBeTruthy();
  });

  it("Returns false if type is not a string", ()=>{
    expect(isRealString(undefined)).toBeFalsy();
  });

  it("Returns false for empty and whitespace string", ()=>{
    expect(isRealString("")).toBeFalsy();
    expect(isRealString("   ")).toBeFalsy();
  });


})
