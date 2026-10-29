import mongoose from "mongoose";

const Anime_schema = new mongoose.Schema(
  {
    ani_id: { type: Number, required: true, unique:true },
    mal_id: { type: Number, index: true },
    title: {
      romaji: {
        type: String,
        default: null,
      },
      english: {
        type: String,
        default: null,
      },
      native: {
        type: String,
        default: null,
      },
    },
    synonyms: {
      type: [String],
      default: [],
    },

    format: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    episodes: {
      type: Number,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
    season: {
      type: String,
      default: null,
    },
    seasonYear: {
      type: Number,
      default: null,
    },
    startDate: {
      year: {
        type: Number,
        default: null,
      },
      month: {
        type: Number,
        default: null,
      },
      day: {
        type: Number,
        default: null,
      },
    },
    endDate: {
      year: {
        type: Number,
        default: null,
      },
      month: {
        type: Number,
        default: null,
      },
      day: {
        type: Number,
        default: null,
      },
    },
    averageScore: {
      type: Number,
      default: null,
    },
    popularity: {
      type: Number,
      default: null,
    },
    favourites: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    genres: {
      type: [String],
      default: [],
    },
    studios: {
      type: [String],
      default: [],
    },
    coverImage: {
      large: {
        type: String,
        default: null,
      },
      extraLarge: { type: String, default: null },
    },
    bannerImage: {
      type: String,
      default: null,
    },
    isAdult: {
      type: Boolean,
      default: false,
    },
    source: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

const Anime = mongoose.model("Anime", Anime_schema);
export default Anime;
