import { Polar } from "@polar-sh/sdk";
// import "server-only";

export const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "sandbox", //TODO: change in production
});
