process.env.DVLA_DB_NAME = "MyTable";
const client = {
  put: jest.fn(() => ({
    promise: jest.fn(),
  })),
};
const db = require("./db")({ client });

describe("db", () => {
  it("can put an item", async () => {
    const item = { id: "123" };
    const result = await db.put(item);

    expect(client.put).toHaveBeenCalledWith({
      TableName: "MyTable",
      Item: item,
    });
    expect(result).toStrictEqual(item);
  });
});
