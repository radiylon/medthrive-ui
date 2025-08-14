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
          profile: input?.stage === "production" ? "radiylon-production" : "radiylon-dev",
          region: "us-west-1",
        },
      },
    };
  },
  async run() {
    const BASE_API_URL = $app.stage !== "production" 
      ? "https://zz61s1kpd7.execute-api.us-west-1.amazonaws.com"
      : "https://59as54pz8e.execute-api.us-west-1.amazonaws.com";

    new sst.aws.Nextjs("MedthriveUI", {
      environment: {
        NEXT_PUBLIC_BASE_API_URL: BASE_API_URL,
      },
    });
  },
});
