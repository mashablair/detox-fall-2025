export interface UserProfile {
  startDate: string; // ISO 8601 format: YYYY-MM-DD
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  products: string[]; // Array of product IDs user has selected (e.g., ['vmg-plus', 'eo-mega'])
}
