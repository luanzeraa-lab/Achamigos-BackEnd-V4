import { Logtail } from "@logtail/node";

export const logtail = new Logtail(process.env.BETTER_STACK_TOKEN as string);