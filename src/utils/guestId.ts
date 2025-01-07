import { v4 as uuidv4 } from 'uuid';

// Generate and store guestId in cookies if it doesn’t exist
export const getGuestId = () => {
  let guestId = document.cookie.split('; ').find((row) => row.startsWith('guestId='))?.split('=')[1];

  if (!guestId) {
    guestId = uuidv4();
    document.cookie = `guestId=${guestId}; path=/; max-age=31536000`; // 1 year
  }

  return guestId;
};
