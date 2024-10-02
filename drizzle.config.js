/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai_interview%20mocker_owner:pQnFk4rzu3ZD@ep-muddy-tooth-a5gbzmki.us-east-2.aws.neon.tech/ai_interview%20mocker?sslmode=require',
    }
  };