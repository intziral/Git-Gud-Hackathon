const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "wru5qu",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
