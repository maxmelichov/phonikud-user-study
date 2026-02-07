/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate name (minimum 2 characters)
 */
export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validate that the A/B rating for a sentence is complete
 * Each sentence requires both naturalness and accuracy preferences
 */
export function areSentenceRatingsComplete(
  sentenceId: string,
  ratings: Array<{ sentenceId: string; naturalness?: 'A' | 'B'; accuracy?: 'A' | 'B' }>
): boolean {
  const rating = ratings.find(r => r.sentenceId === sentenceId);
  return Boolean(rating?.naturalness && rating?.accuracy);
}
