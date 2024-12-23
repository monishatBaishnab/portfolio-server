"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Skill name required." }),
    tagline: zod_1.z.string({ required_error: "Skill tagline required." }),
});
const update = zod_1.z.object({
    name: zod_1.z.string().optional(),
    tagline: zod_1.z.string().optional(),
});
exports.SkillSchemas = { create, update };
