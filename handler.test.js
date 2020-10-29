jest.mock("./dependencies");
const { saveRecord, saveMultipleRecords } = require("./dependencies");

const { data } = require("./handler");

describe("handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a 400 if event does not contain a body", async () => {
    const result = await data();

    expect(result.statusCode).toBe(400);
  });

  it("returns a 500 with error if saveRecord throws an exception", async () => {
    const event = { body: JSON.stringify({ id: "1234" }) };

    saveRecord.mockImplementationOnce(() => {
      throw "error saving";
    });

    const result = await data(event);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(JSON.stringify({ error: "error saving" }));
  });

  it("saves a record when valid input is provided", async () => {
    const event = { body: JSON.stringify({ id: "1234" }) };

    const result = await data(event);

    expect(saveRecord.mock.calls.length).toBe(1);
    expect(saveRecord.mock.calls[0][0]).toStrictEqual({ id: "1234" });
    expect(result.statusCode).toBe(200);
  });

  it("calls saveRecord if single record", async () => {
    const event = { body: JSON.stringify({ id: "1234" }) };
    await data(event);
    expect(saveRecord).toHaveBeenCalledTimes(1);
    expect(saveMultipleRecords).not.toHaveBeenCalled();
  });

  it("calls saveMultipleRecords if multiple records", async () => {
    const event = {
      body: JSON.stringify([{ key1: "1234" }, { key2: "1234" }]),
    };
    await data(event);
    expect(saveMultipleRecords).toHaveBeenCalledTimes(1);
    expect(saveRecord).not.toHaveBeenCalled();
  });

  // Batch insert with new endpoint
});
