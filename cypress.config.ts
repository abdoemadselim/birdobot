import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    supportFile: 'cypress/support/component.tsx',
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
