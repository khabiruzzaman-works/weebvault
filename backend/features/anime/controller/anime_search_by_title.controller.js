import { App_error, App_response } from "../../../utils/app_outcome_handler.js";
import anime_search_by_title_service from "../service/anime_search_by_title.service.js";


export default async function anime_search_title_controller(c) {
  const title =  c.req.query("title");
  const page =  Math.max(1,Number(c.req.query("page"))) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  if (!title || title.trim() === "") { throw new App_error("must have a title", 400, "VALIDATION_ERROR") }
  const {anime_seaches, total_anime} = await anime_search_by_title_service({ title, skip, limit });
  return new App_response("search is successful", 200, {
    anime_seaches,
    total_anime,
    page,
    limit,
    total_page:Math.ceil( total_anime / limit),
  }).send_response(c);
}
