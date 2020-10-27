const db = {
  put: jest.fn(),
};
const saveRecord = require("./save-record")({ db });

describe("save-record", () => {
  it("can save a single record", async () => {
    const record = { id: "123" };
    await saveRecord(record);

    expect(db.put).toHaveBeenCalledWith(record);
  });
});
