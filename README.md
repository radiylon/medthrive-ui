# Medthrive UI

This is a barebones UI for an example medication management app.

[Medthrive URL](https://d3iqr4nk3h4ypf.cloudfront.net)

[Project Notes](https://docs.google.com/document/d/1lZQ15cpvRAOPbPFhcNsnM_V71i-V8CkYG91ndv7g3u0/edit?tab=t.0Z)

## Installation

After cloning down the repo, please run `npm install` to install all necessary dependencies.

This project utilizes AWS via sst.dev.  In order to to properly run the application, you will need to ensure you have an AWS account/credentials.  You will also need to have the `aws` CLI setup.  Please see these [instructions](https://sst.dev/docs/aws-accounts/) for setting this up.

Once complete, you will need to replace the profiles in `sst.config.ts` with your own account profiles.

You will also need to update the URL in `config/index.ts` to match the one for your locally deployed API.

From there, you should be able to run `npx sst dev` for local development.
