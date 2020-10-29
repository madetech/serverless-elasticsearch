process.env.DB_NAME = "MyTable";
jest.mock("nanoid");
const { nanoid } = require("nanoid");

describe("db", () => {
  const client = {
    put: jest.fn(() => ({
      promise: jest.fn(),
    })),
    batchWrite: jest.fn(() => ({
      promise: jest.fn(),
    })),
  };
  const db = require("./db")({ client });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("can put an item", async () => {
    nanoid.mockImplementationOnce((x) => "123");
    const item = { name: "foo" };
    const result = await db.put(item);

    expect(client.put).toHaveBeenCalledWith(
      expect.objectContaining({
        TableName: "MyTable",
        Item: {
          id: "123",
          name: "foo",
        },
      })
    );
    expect(result).toStrictEqual(item);
  });

  it("can write a bunch of items", async () => {
    nanoid.mockImplementation((x) => "123");
    const items = [{ name: "foo" }, { name: "bar" }, { name: "potato" }];
    const result = await db.batchWrite(items);

    expect(client.batchWrite).toHaveBeenCalledWith(
      expect.objectContaining({
        RequestItems: {
          MyTable: [
            {
              PutRequest: {
                Item: {
                  id: "123",
                  name: "foo",
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: "123",
                  name: "bar",
                },
              },
            },
            {
              PutRequest: {
                Item: {
                  id: "123",
                  name: "potato",
                },
              },
            },
          ],
        },
      })
    );
    expect(result).toStrictEqual(items);
  });
});
