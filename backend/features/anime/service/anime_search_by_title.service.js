import Anime from "../model/anime.model.js";

export default async function anime_search_by_title_service({title,skip,limit}) {
  const valid_title = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim();

  const filter = {
    $or: [
      { "title.romaji": { $regex: valid_title, $options: "i" } },
      { "title.english": { $regex: valid_title, $options: "i" } },
      { "title.native": { $regex: valid_title, $options: "i" } },
      { synonyms: { $regex: valid_title, $options: "i" } },
    ],
  };

  const anime_seaches = await Anime.find(filter).sort({ popularity: -1, _id: 1 }).skip(skip).limit(limit).lean();
  const total_anime = await Anime.countDocuments(filter);
  return { anime_seaches, total_anime };
}
