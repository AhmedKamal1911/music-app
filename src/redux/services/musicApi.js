// Need to use the React-specific entry point to import createApi
import { flattenAttributes } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import qs from "qs";

// Define a service using a base URL and expected endpoints
const baseUrl = `${import.meta.env.VITE_STRAPI_MUSIC_BASE_URL}/api`;
export const musicApi = createApi({
  reducerPath: "musicApi",

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // music
    getMusic: builder.query({
      query: ({ genre, page }) => {
        return {
          url: "/musics",
          params: qs.stringify(
            {
              populate: {
                img: true,
                audio: true,
                title: true,
                genre: true,
              },
              ...(genre
                ? {
                    filters: {
                      genres: {
                        value: {
                          $eq: genre,
                        },
                      },
                    },
                  }
                : {}),
              pagination: {
                page,
                pageSize: 10,
              },
            },
            {
              encodeValuesOnly: true, // prettify URL
            }
          ),
        };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          currentCache.data = []; // Clear the cache if the page is 1 (new genre or refresh)
        }
        currentCache.data = [...currentCache.data, ...newItems.data];

        // }; // Ensure returning updated cache
      },
      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        // console.log("newquery Args after delete Page", newQueryArgs);
        return newQueryArgs;
      },
      // Refetch when the page arg changes or category/genre changes
      forceRefetch({ currentArg, previousArg }) {
        // console.log({ currentArg, previousArg }, "cur prev");

        return (
          currentArg?.genre !== previousArg?.genre ||
          currentArg?.page !== previousArg?.page
        );
      },

      transformResponse: (response) => {
        // flatten my attributes
        return flattenAttributes(response);
      },
    }),
    getMusicGenres: builder.query({
      query: () => ({
        url: "/genres",
      }),

      transformResponse: (response) => {
        // flatten my attributes
        return flattenAttributes(response);
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMusicQuery, useGetMusicGenresQuery } = musicApi;
