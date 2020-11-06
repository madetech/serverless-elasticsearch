const lambda = {
  addTrigger: jest.fn(),
};
const addTrigger = require("./add-trigger")({ lambda });

describe("add-trigger", () => {
  it("can add a trigger", async () => {
    await addTrigger();
    expect(lambda.addTrigger).toHaveBeenCalled();
  });
});
