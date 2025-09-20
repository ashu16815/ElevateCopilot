export const BRAND = 'ElevateCopilot';
export const COLORS = { navy: '#0F172A', gold: '#C6A664' };
export const MARKET = process.env.NEXT_PUBLIC_PRIMARY_MARKET || 'New Zealand';
export const MODE = (process.env.NEXT_PUBLIC_MODE || 'mission') as 'mission' | 'paid';
export const TARGET = Number(process.env.NEXT_PUBLIC_IMPACT_TARGET || '1000');
