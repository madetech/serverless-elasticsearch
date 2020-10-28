jest.mock("./dependencies");
const { saveRecord } = require("./dependencies");

const { data } = require("./handler");

describe("handler", () => {
  it("returns a 400 if event does not contain a body", async () => {
    const result = await data();

    expect(result.statusCode).toBe(400);
  });

  it("returns a 400 if event body does not contain an id", async () => {
    const event = { body: { invalid: "object" } };

    const result = await data(event);

    expect(result.statusCode).toBe(400);
  });

  it("returns a 500 with error if saveRecord throws an exception", async () => {
    const event = { body: { id: "1234" } };

    saveRecord.mockImplementationOnce(() => { throw "error saving" })

    const result = await data(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(JSON.stringify({"error":"error saving"}));
  })

  // Happy path where it saves :)
});
