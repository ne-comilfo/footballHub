import { z } from "zod";

export function paginatedSchema<T extends z.ZodType>(item: T) {
  return z.object({
    items: z.array(item),
    page: z.number().int(),
    totalItems: z.number().int(),
    totalPages: z.number().int(),
  });
}

export type Paginated<T> = {
  items: T[];
  page: number;
  totalItems: number;
  totalPages: number;
};

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  limit: z.coerce.number().int().min(1).max(60).catch(9),
  search: z.string().trim().default(""),
});

export type ListQuery = z.infer<typeof listQuerySchema>;

export const errorResponseSchema = z.object({
  message: z.string(),
});
