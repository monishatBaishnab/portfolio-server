"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    title: zod_1.z.string({ required_error: "Project title is required." }),
    description: zod_1.z.string({ required_error: "Project description is required." }),
    overview: zod_1.z.string({ required_error: "Project overview is required." }).optional(),
    skills: zod_1.z
        .array(zod_1.z.string({ required_error: "Each skill ID must be a string." }))
        .nonempty({ message: "At least one skill is required." }),
    links: zod_1.z
        .object({
        client: zod_1.z.string().url("Client URL must be valid.").optional(),
        server: zod_1.z.string().url("Server URL must be valid.").optional(),
        live: zod_1.z.string().url("Live URL must be valid.").optional(),
    })
        .optional(),
});
const update = zod_1.z.object({
    title: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    overview: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    skills: zod_1.z.array(zod_1.z.string()).optional(),
    links: zod_1.z
        .object({
        client: zod_1.z.string().url("Client URL must be valid.").optional(),
        server: zod_1.z.string().url("Server URL must be valid.").optional(),
        live: zod_1.z.string().url("Live URL must be valid.").optional(),
    })
        .optional(),
});
exports.ProjectSchemas = { create, update };
