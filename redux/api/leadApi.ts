import type { TLeadInput } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const leadApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLead: build.mutation<unknown, TLeadInput>({
      query: (data) => ({ url: "/leads", method: "POST", data }),
      invalidatesTags: [tagTypes.leads],
    }),
  }),
});

export const { useCreateLeadMutation } = leadApi;
