"use strict";

const User = use("App/Models/User");

const { test, trait, before } = use("Test/Suite")("User");

trait("Test/ApiClient");
trait("Auth/Client");

before(async () => {
  await User.create({
    name: "test.user",
    email: "test.user@test.com",
    password: "test123",
    document: "000.000.000-00"
  });
});

test("Login", async ({ client }) => {
  const response = await client
    .post("api/auth/login/")
    .send({
      email: "test.user@test.com",
      password: "test123",
    })
    .end();

  response.assertStatus(201);
});

test("Logout", async ({ client }) => {
  const user = await User.first();
  const response = await client
    .get("api/auth/logout/")
    .loginVia(user, "jwt")
    .end();
  response.assertStatus(403);
});

test("Register a user", async ({ client }) => {
  const response = await client
    .post("api/auth/register/")
    .send({
      name: "test",
      email: "test@test.com",
      password: "test123",
      document: "111.111.111-111"
    })
    .end();

  response.assertStatus(201);
});
test("Get the authenticated user", async ({ client }) => {
  const user = await User.first();

  const response = await client.get("api/user/me/").loginVia(user, "jwt").end();

  response.assertStatus(200);
});

test("Change password", async ({ client }) => {
  const user = await User.first();
  const response = await client
    .put("api/user/password/")
    .send({
        password: "test123",
        newPassword: "test12"
      })
    .loginVia(user, "jwt")
    .end();
  response.assertStatus(200);
});
