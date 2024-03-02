import { HelloRoute } from "./hello.route.ts";

const defaultRoutes = [
  {
    path: `/api/v1/hello`,
    route: HelloRoute,
  },
];
export const DefaultRoute = defaultRoutes;
