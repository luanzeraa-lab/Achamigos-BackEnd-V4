import { logtail } from "../config/loggerConfig";

export const logger = {
  info: async (message: string, data?: any) => {
    await logtail.info(message, data);
  },

  error: async (message: string, error?: any) => {
    await logtail.error(message, error);
  }
};