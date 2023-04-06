import { procedure, router } from '../trpc';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';

export const appRouter = router({
  getImageSource: procedure
    .query(async () => {
      let data: any = await fetch(`https://api.unsplash.com/photos?page=1&per_page=50&client_id=J6AaEoJgVM5tWx2SxXGzpmXl4qnJuonkCG6s4_KSXOY`, {
        method: "GET"
      })
      return {
        imgSource: await data.json()
      }
    }),
  saveRequest: procedure.
  input(
    z
      .object({
        text: z.string(),
        url: z.string()
      })
      .optional(),
  )
  .query(async ({ input }) => {
    let data;
    let temp;
    const edit = input?.text;
    const url = input?.url;
    const dataPath = path.resolve(__dirname, "../../result")
    const filePath = path.resolve(__dirname, "../../result/result.json")
    if(!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);
    if(fs.existsSync(filePath)) data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
    temp = JSON.parse(data || "{}");
    temp[`${edit}`] = url;

    fs.writeFileSync(filePath, JSON.stringify(temp))
    return {
      success: temp
    }
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;