import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "/api/articles/",
    prepareHeaders: (headers) => {
        return headers;
    }
});

export const articlesLikesDislikes = createApi({
    reducerPath: "articlesLikesDislikes",
    baseQuery,
    tagTypes: ['Likes'], // Add 'Likes' here

    endpoints: (builder) => ({
        getArticleLikes: builder.query({
            query: (articleId) => {
                return `${articleId}/likes`;
            },
            transformResponse: (response) => {
                console.log("pesho response", response);
                return response;
            },
            providesTags: (result, error, articleId) => [{ type: "Likes", id: articleId }],
        }),
        likeArticle: builder.mutation({
            query: ({ articleId, type }) => {
                return {
                    url: `${articleId}/like`,
                    method: "POST",
                    body: {
                        articleId:articleId,
                        type: type
                    },
                };
            },
            async onQueryStarted({ articleId }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("pesho DATA", data);
                    dispatch(articlesLikesDislikes.util.invalidateTags([{ type: "Likes", id: articleId }]));
                } catch (error) {
                    return error
                }
            },
        }),
    }),
});

export const { useGetArticleLikesQuery, useLikeArticleMutation } = articlesLikesDislikes;
