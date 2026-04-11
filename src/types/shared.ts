/** Types shared across multiple features or not tied to any single domain. */

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  restaurantName: string;
  avatar?: string;
}
