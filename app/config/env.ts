const notes = {
  revalidate: process.env.REVALIDATE_NOTES
    ? parseInt(process.env.REVALIDATE_NOTES)
    : 60 * 60, // in seconds
};

export { notes };
