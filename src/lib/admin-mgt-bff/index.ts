import createClient from "openapi-fetch";
import { components, paths } from "./types";

export type Agency = components["schemas"]["Agency"];

export const client = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_ADMIN_MGT_BFF,
});
