// Tutorial videos hosted on YouTube, keyed by product id and platform.
// Videos cover every version/year of a product and only change with the platform.
type Platform = 'Windows' | 'macOS';

const tutorialVideos: Record<string, Partial<Record<Platform, string>>> = {
  sketchup_2026_win: { Windows: 'WHGYc-p2ZgU', macOS: '8aB-l4UfuV8' },
  rhinoceros_8: { Windows: '6VQ9uPxKY3o' },
  parallels_desktop_26: { macOS: 'YqJzjcQx0K0' },
  photoshop_2026: { macOS: 'l-fwHSsrlmg' },
  coreldraw_2026: { Windows: 'X6ZpPOATBkU' },
  autocad_2027_win: { Windows: 'zFkNL8Qr6GE', macOS: 'sjq0bR8ZBPU' },
  eberick_builder_2025: { Windows: 'u6cKfBZIfdQ' },
  archicad_30: { Windows: 'PrvirSYK6eg' },
  revit_2027: { Windows: 'a0bK6hRwVNw' },
  cype_2026: { Windows: 'bi68Z8c1JYk' },
  promob_professional_2025: { Windows: 'VWI0ZpibXWI' },
};

export function getTutorialVideoId(productId: string, platform: Platform): string | undefined {
  return tutorialVideos[productId]?.[platform];
}
