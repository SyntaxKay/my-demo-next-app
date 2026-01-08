import {z} from "zod";

const UserSchema = z.object({
    name: z.string().min(3).max(100),
    email: z.email()
})

export default UserSchema; 