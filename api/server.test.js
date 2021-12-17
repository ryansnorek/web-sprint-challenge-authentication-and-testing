const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const { getAll, findById } = require("./models/users-model");

const user = { username: "bob", password: 1 };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(undefined).toBe();
});

test("correct env", () => {
  expect(process.env.NODE_ENV).toBe('testing')
});

describe("[POST] /register", () => {
  test("cannot register if user already exists", async () => {
    
    

    // const id = await request(server).post("/api/auth/register").send(user);
    // const [id] = await db("users").insert(user);

    // const userInDB = await findById(id)
    // expect(userInDB).toMatchObject({ id: 1, password: "1", username: "bob" })
  })
});
