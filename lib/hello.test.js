const hello = require("./hello");

describe("hello", () => {
  it("can say hello!", async () => {
    const result = await hello();
    expect(result).toStrictEqual({ message: "ERROR BAD" });
  });
});
