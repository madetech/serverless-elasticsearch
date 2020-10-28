process.env.DVLA_DB_NAME = "MyTable";
const client = {
  put: jest.fn(() => ({
    promise: jest.fn(),
  })),
};
jest.mock("nanoid");
const { nanoid } = require("nanoid");
const db = require("./db")({ client });

describe("db", () => {
  it("can put an item", async () => {
    nanoid.mockImplementationOnce((x) => "123")
    const item = { name: "foo" };
    const result = await db.put(item);

    expect(client.put).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: "MyTable",
        Item: {
          id: "123",
          name: "foo"
        },
      })
    );
    expect(result).toStrictEqual(item);
  });
});
