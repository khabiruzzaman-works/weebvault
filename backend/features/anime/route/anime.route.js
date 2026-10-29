import { Hono } from "hono";
import anime_search_title_controller from "../controller/anime_search_by_title.controller";

const route = new Hono();

route.get("/search", anime_search_title_controller);


export default route;
