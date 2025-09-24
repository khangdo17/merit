export interface UserProfile {
  name: string;
  avatarUrl?: string; // Public URL or path under `public/`
}

// Edit these values to customize your personal info
export const USER_PROFILE: UserProfile = {
  name: 'Khang Do',
  // Place an image at `public/profile.jpg` or use a full URL:
  avatarUrl: '/profile.jpg',
};


