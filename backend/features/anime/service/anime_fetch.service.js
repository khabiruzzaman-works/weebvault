import { App_error } from "../../../utils/app_outcome_handler.js";

const api = "https://graphql.anilist.co";
const delay = 850;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const QUERY = `
query ($page: Int, $per_page: Int, $from: FuzzyDateInt, $to: FuzzyDateInt) {
  Page(page: $page, perPage: $per_page) {
    pageInfo { hasNextPage }
    media(type: ANIME, sort: ID, startDate_greater: $from, startDate_lesser: $to) {
      id
      idMal
      title { romaji english native }
      synonyms
      format
      status
      episodes
      duration
      season
      seasonYear
      startDate { year month day }
      endDate { year month day }
      averageScore
      popularity
      favourites
      description(asHtml: false)
      genres
      studios(isMain: true) { nodes { name } }
      coverImage { large extraLarge }
      bannerImage
      isAdult
      source
    }
  }
}
`;

export default async function anime_fetch(page, year) {
  for (let tried = 0; tried <= 3; tried++) {
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: QUERY,
          variables: {
            page,
            per_page: 50,
            from: year * 10000 - 1,
            to: (year + 1) * 10000,
          },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          const secs = Number(response.headers.get("Retry-After")) || 60;
          console.log(`rate limited, waiting ${secs}s`);
          await wait(secs * 1000);
          throw new Error("retryable 429");
        }
        if (response.status >= 500) throw new Error(`retryable ${response.status}`);
        const body = await response.text();
        throw new App_error(`anilist ${response.status}: ${body}`, 502, "FETCH_FAILED");
      }

      const result = await response.json();
      if (result.errors) {
        throw new App_error(result.errors[0].message, 502, "ANILIST_ERROR");
      }
      return result.data.Page; // { pageInfo, media }
    } catch (error) {
      if (error instanceof App_error || tried === 3) throw error;
      console.log(`retrying ${year} page ${page}: ${error.message}`);
      await wait((tried + 1) * delay);
    }
  }
}
