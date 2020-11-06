const lambda = {
  removeTrigger: jest.fn(),
};
const removeTrigger = require("./remove-trigger")({ lambda });

describe("remove-trigger", () => {
  it("can remove a trigger", async () => {
    await removeTrigger();
    expect(lambda.removeTrigger).toHaveBeenCalled();
  });
});
