/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "medthrive-ui",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "radiylon-production" : "radiylon-develop",
          region: "us-west-1",
        },
      },
    };
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.branch === "main" && event.action === "pushed") {
          return { stage: "production" };
        }
      }
    }
  },
  async run() {
    const BASE_API_URL = process.env.MEDTHRIVE_API_URL || "";

    new sst.aws.Nextjs("MedthriveUI", {
      environment: {
        NEXT_PUBLIC_BASE_API_URL: BASE_API_URL,
      },
    });
  },
});
