"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceSchemas = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    company: zod_1.z.string({ required_error: "Company name is required." }),
    designation: zod_1.z.string({ required_error: "Designation is required." }),
    startDate: zod_1.z.string({ required_error: "Start date is required." }),
    endDate: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    technologies: zod_1.z.array(zod_1.z.string()).optional(),
});
const update = zod_1.z.object({
    company: zod_1.z.string().optional(),
    designation: zod_1.z.string().optional(),
    startDate: zod_1.z.string().optional(),
    endDate: zod_1.z.string().nullable().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
    technologies: zod_1.z.array(zod_1.z.string()).optional()
});
exports.ExperienceSchemas = { create, update };
