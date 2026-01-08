import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(1).max(200),
    price: z.float64().nonnegative()
})

export default ProductSchema;