const db = {
  put: jest.fn(),
  batchWrite: jest.fn(),
};
const saveMultipleRecords = require("./save-multiple-records")({ db });

describe("save-multiple-records", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("can save a bunch of records", async () => {
    const records = [{ key1: "value1" }, { key2: "value2" }];
    await saveMultipleRecords(records);

    expect(db.batchWrite).toHaveBeenCalledWith(records);
  });
});
