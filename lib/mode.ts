export const MODE = (process.env.NEXT_PUBLIC_MODE || 'mission') as 'mission' | 'paid';
export const IS_MISSION = MODE === 'mission';
