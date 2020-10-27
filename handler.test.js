const { IoT1ClickDevicesService } = require("aws-sdk");

jest.mock("./dependencies");
const { saveRecord } = require("./dependencies");

const { data } = require("./handler");

describe("handler", () => {
  it("returns a 400 if event does not contain a body", async () => {
    const result = await data();

    expect(result.statusCode).toBe(400);
  });
});
