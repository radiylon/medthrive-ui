# medthrive-ui

MEDTHRIVE is an example medication management app for caregivers. This is the frontend UI component of the application, built to provide a clean and intuitive interface for managing patient medications.  For the API repo, please see [medthrive-api](https://github.com/radiylon/medthrive-api).

Built using Next.js, React, and Tailwind CSS, deployed via SST.

[App Demo](https://d3aozqk9inqzy1.cloudfront.net/)

[Project Notes](https://docs.google.com/document/d/1lZQ15cpvRAOPbPFhcNsnM_V71i-V8CkYG91ndv7g3u0/edit?tab=t.0Z)

## Tech Stack

### Core Technologies
- TypeScript
- React
- Next.js
- TanStack Query (React Query)

### Styling & UI
- Tailwind CSS
- DaisyUI

### Infrastructure
- SST
- AWS CloudFront
- AWS S3

## Installation

After cloning down the repo, please run `npm install` to install all necessary dependencies.

This project utilizes AWS via sst.dev. In order to properly run the application, you will need to:

1. Have an AWS account and credentials
2. Install and configure the AWS CLI
3. Follow the [SST AWS setup instructions](https://sst.dev/docs/aws-accounts/)
4. Replace the profiles in `sst.config.ts` with your own account profiles
5. Update the API URL in `config/index.ts` to match your locally deployed API
6. Run `npm run dev` to start local development
