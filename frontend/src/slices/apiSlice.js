// Slices are a way to organize application state => collection of actions and reducers related to
//each other we can create multiple slices in our app and each slice can have it own state

// API slice is basically the parent to our other api slices
//---- we can use {createSlice} for regular slices (not async request), since we are dealing with
// backend we use {createApi} which behave differently

// {fetchBaseQuery} => allows us to make request to backen API
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  //tagTypes => used to define the types of data will be fetching from the API
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
