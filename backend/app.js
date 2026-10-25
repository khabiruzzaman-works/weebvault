import { Hono } from "hono";
import { cors } from "hono/cors";
import authentication_route from "./features/authentication/route/authentication.route";


const app = new Hono();

app.route("/api/authentication", authentication_route);
//
// app.get("/", function (c) {
//  return c.json("hi from app")
// })


export default app;
