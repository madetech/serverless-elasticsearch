const hello = require("./hello");

describe("hello", () => {
  it("can say hello!", () => {
    const result = hello();
    expect(result).toBe("hello!");
  });
});
