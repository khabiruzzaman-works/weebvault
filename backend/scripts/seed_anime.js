import mongoose from "mongoose";
import connect_to_db from "../config/mongodb.js";
import anime_fetch from "../features/anime/service/anime_fetch.service.js";
import Anime from "../features/anime/model/anime.model.js";



function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function map_anime(m) {
  return {
    ani_id: m.id,
    mal_id: m.idMal ?? null,
    title: m.title,
    synonyms: m.synonyms ?? [],
    format: m.format,
    status: m.status,
    episodes: m.episodes,
    duration: m.duration,
    season: m.season,
    seasonYear: m.seasonYear,
    startDate: m.startDate,
    endDate: m.endDate,
    averageScore: m.averageScore,
    popularity: m.popularity,
    favourites: m.favourites,
    description: m.description,
    genres: m.genres ?? [],
    studios: m.studios?.nodes?.map((s) => s.name) ?? [],
    coverImage: m.coverImage,
    bannerImage: m.bannerImage,
    isAdult: m.isAdult ?? false,
    source: m.source,
  };
}

try {
  await connect_to_db();
  await Anime.init();

  const this_year = new Date().getFullYear();
  let total = 0;

  for (let year = 1940; year <= this_year + 2; year++) {
    let page = 1;
    while (true) {
      const { media, pageInfo } = await anime_fetch(page, year);

      if (media.length) {
        const r = await Anime.bulkWrite(
          media.map((m) => ({
            updateOne: {
              filter: { ani_id: m.id },
              update: { $set: map_anime(m) },
              upsert: true,
            },
          })),
          { ordered: false },
        );
        total += media.length;
        console.log(
          `${year} p${page} | total ${total} | new ${r.upsertedCount}, updated ${r.modifiedCount}`,
        );
      }

      if (!pageInfo.hasNextPage) break;
      page++;
      await wait(850);
    }
    await wait(850);
  }
  console.log("finished");
} catch (error) {
  console.error("seed stopped:", error.message);
  console.log("run it again to resume");
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
function delay_between_pages() {
  return 850;
}
