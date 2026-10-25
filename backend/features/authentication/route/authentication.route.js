import { Hono } from "hono";
import { register_controller } from "../controller/register.controller.js";
import login_controller from "../controller/login.controller.js";

const route = new Hono();

route.post("/register", register_controller);
route.post("/login", login_controller);

export default route;
