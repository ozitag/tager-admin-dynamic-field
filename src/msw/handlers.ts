import { RequestHandler } from "msw";

import { getBrands } from "./get-brands";

export const mswHandlers: Record<string, RequestHandler | RequestHandler[]> = {
  brands: getBrands,
};
