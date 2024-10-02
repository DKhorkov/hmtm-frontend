import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.API_URL || "http://127.0.0.1:8080/query",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  // documents: ["**/*.{ts,tsx}"],
  generates: {
    "./graphql/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
