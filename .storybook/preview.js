import { initialize as initializeMSW, mswDecorator } from "msw-storybook-addon";
import { app } from "@storybook/vue3";
import vueRouter from "storybook-vue3-router";
import {
  configStore,
  i18n,
  i18nPlugin,
  initializeEnvironment,
  LOCAL_ENV,
} from "@tager/admin-services";
import "@tager/admin-ui/css";

import config from "../src/constants/config.json";
import { mswHandlers } from "../src/msw/handlers";

export const decorators = [vueRouter(), mswDecorator];

export const parameters = {
  /**
   * Hide `Docs` tab
   * Reference: {@link https://github.com/storybookjs/storybook/issues/13111#issuecomment-730741560}
   */
  previewTabs: {
    "storybook/docs/panel": { hidden: true },
  },
  msw: {
    handlers: mswHandlers,
  },
};

initializeMSW();

initializeEnvironment({
  accessToken: process.env.STORYBOOK_ACCESS_TOKEN,
  apiUrl: process.env.STORYBOOK_API_URL,
  appEnv: LOCAL_ENV,
});

app.use(i18nPlugin);

configStore.setConfig(config);

i18n.init({ debug: false, lng: "ru" });
