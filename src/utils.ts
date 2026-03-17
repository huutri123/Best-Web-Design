export function getRatingColor(rating: number): string {
  if (rating < 1000) return 'var(--theme-white)'; // White (Novice)
  if (rating < 1300) return 'var(--theme-neon-green)'; // Green (Apprentice)
  if (rating < 1600) return 'var(--theme-neon-blue)'; // Blue (Specialist)
  if (rating < 1900) return 'var(--theme-neon-purple)'; // Purple (Expert)
  if (rating < 2200) return 'var(--theme-neon-yellow)'; // Yellow (Master)
  return 'var(--theme-neon-red)'; // Red (Grandmaster)
}

export function getRatingTitle(rating: number): string {
  if (rating < 1000) return 'Novice';
  if (rating < 1300) return 'Apprentice';
  if (rating < 1600) return 'Specialist';
  if (rating < 1900) return 'Expert';
  if (rating < 2200) return 'Master';
  return 'Grandmaster';
}
