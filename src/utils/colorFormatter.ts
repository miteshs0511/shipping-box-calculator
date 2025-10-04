export const hexToRgb = (hex: string): string => {
  if (!hex) return '(0, 0, 0)';

  // If it's already an rgb(...) string, try to extract numbers
  if (hex.trim().startsWith('rgb')) {
    const m = hex.match(/\(([^)]+)\)/);
    if (m && m[1]) {
      const parts = m[1].split(',').map((p) => p.trim());
      if (parts.length >= 3) {
        return `(${parts[0]}, ${parts[1]}, ${parts[2]})`;
      }
    }
    return '(0, 0, 0)';
  }

  // Normalize hex
  let h = hex.replace('#', '').trim();
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join('');
  }
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `(${r}, ${g}, ${b})`;
  }
  return '(0, 0, 0)';
};
