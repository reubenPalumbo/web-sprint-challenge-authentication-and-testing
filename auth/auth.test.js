const request = require("supertest");
const auth = require("../api/server");

describe("auth module", () => {
  it("env test", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("[POST] /api/auth", () => {
    // it("post test", async () => {
    //   const data = { username: "red", password: "ded" };

    //   await request(auth)
    //     .post("/api/auth/")
    //     .send(data)
    //     .expect(200)
    //     .then((res) => {
    //       expect(res.data).toBe(data);
    //     });
    // });

    it("work with jest", async () => {
      const data = { username: "red", password: "ded" };

      await request(auth).post("/api/auth/register").send(data).expect(500);
    });

    it("work with jest", async () => {
      const res = await request(auth).post("/api/auth/login");
      expect(res.status).toBe(500);
    });
  });
});
