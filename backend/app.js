import { Hono } from "hono";
import { cors } from "hono/cors";
import authentication_route from "./features/authentication/route/authentication.route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.route("/api/authentication", authentication_route);
//
// app.get("/", function (c) {
//  return c.json("hi from app")
// })

export default app;
