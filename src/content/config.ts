import { defineCollection, z } from 'astro:content';

const dateRangeSchema = z
  .object({
    startDate: z.coerce.date(),
    endDate  : z.coerce.date().optional(),
  })
  .refine((data) => typeof data.endDate === 'undefined' || data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const work = defineCollection({
  schema: z.object({
    title       : z.string(),
    description : z.string().optional(),
    date        : z.coerce.date(),
    link        : z.string().url(),
    company     : z.string(),
    extraInfos: z.array(z.string()).optional()
  }),
});
const jobs = defineCollection({
  schema: z.object({
    company    : z.string(),
    companyLink: z.string().url(),
    jobTitle   : z.string(),
    tasks      : z.array(z.string()).optional(),
    dates      : dateRangeSchema
  }),
});

export const collections = { work, jobs };
