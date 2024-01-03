type TEnv = 'dev' | 'prod' | 'prev';

const environment: TEnv = (process.env.ENVIRONMENT as TEnv) || 'dev';

const url = {
  dev: 'http://localhost:3000',
  prod: 'https://wiki.gelzin.com',
  prev: 'https://wiki-prev.gelzin.com',
};

const baseUrl = url[environment];

const notes = {
  revalidate: process.env.REVALIDATE_NOTES
    ? parseInt(process.env.REVALIDATE_NOTES)
    : 60 * 60, // in seconds
};

export { environment, notes, url, baseUrl };
