import { rest } from "msw";

export const handlers = [
  rest.get("/api/count/get", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 234,
      })
    );
  }),
  rest.put("/api/count/update", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 235,
      })
    );
  }),
];
