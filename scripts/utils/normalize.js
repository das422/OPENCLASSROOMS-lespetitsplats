// utils/normalize.js
export const normalizeText = (text) => {
  return text
    .normalize('NFD') // Normalize the string into decomposed form
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim() // Trim leading and trailing spaces
    .toLowerCase(); // Convert to lowercase
};
