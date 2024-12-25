"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Blog title is required." }),
    description: zod_1.z.string({ required_error: "Blog description is required." }),
    content: zod_1.z.string({ required_error: "Blog content is required." }).optional(),
    skills: zod_1.z
        .array(zod_1.z.string({ required_error: "Each skill ID must be a string." }))
        .nonempty({ message: "At least one skill is required." }),
});
const update = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.BlogSchemas = { create, update };
