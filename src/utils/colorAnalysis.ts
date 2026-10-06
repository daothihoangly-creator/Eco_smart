import { EnvironmentType, IndicatorType } from '../types';

// Standard Universal Indicator RGB Palette mapped from pH 0 to 14
export const STANDARD_UNIVERSAL_PALETTE: { pH: number; rgb: [number, number, number]; name: string; env: EnvironmentType }[] = [
  { pH: 0, rgb: [180, 20, 20], name: 'Đỏ thẫm', env: 'acid' },
  { pH: 1, rgb: [200, 40, 30], name: 'Đỏ đậm', env: 'acid' },
  { pH: 2, rgb: [220, 70, 30], name: 'Đỏ cam', env: 'acid' },
  { pH: 3, rgb: [235, 110, 40], name: 'Cam đỏ', env: 'acid' },
  { pH: 4, rgb: [240, 150, 45], name: 'Cam sáng', env: 'acid' },
  { pH: 5, rgb: [220, 190, 50], name: 'Vàng cam', env: 'acid' },
  { pH: 6, rgb: [180, 210, 60], name: 'Vàng lục', env: 'acid' },
  { pH: 7, rgb: [60, 175, 110], name: 'Xanh lá cây', env: 'neutral' },
  { pH: 8, rgb: [30, 155, 140], name: 'Xanh mòng két', env: 'base' },
  { pH: 9, rgb: [30, 130, 180], name: 'Xanh dương nhạt', env: 'base' },
  { pH: 10, rgb: [35, 95, 200], name: 'Xanh dương', env: 'base' },
  { pH: 11, rgb: [60, 50, 180], name: 'Xanh chàm', env: 'base' },
  { pH: 12, rgb: [90, 30, 150], name: 'Tím', env: 'base' },
  { pH: 13, rgb: [115, 25, 120], name: 'Tím đậm', env: 'base' },
  { pH: 14, rgb: [90, 20, 90], name: 'Tím thẫm', env: 'base' },
];

// Litmus Palette
export const LITMUS_PALETTE = [
  { pH: 2, rgb: [210, 40, 40], name: 'Đỏ (Acid)', env: 'acid' as EnvironmentType },
  { pH: 7, rgb: [130, 100, 180], name: 'Tím (Trung tính)', env: 'neutral' as EnvironmentType },
  { pH: 12, rgb: [30, 80, 210], name: 'Xanh (Base)', env: 'base' as EnvironmentType },
];

// Phenolphthalein Palette
export const PHENOLPHTHALEIN_PALETTE = [
  { pH: 5, rgb: [235, 235, 235], name: 'Không màu (Acid/Trung tính)', env: 'acid' as EnvironmentType },
  { pH: 9, rgb: [230, 120, 180], name: 'Hồng nhạt (Base yếu)', env: 'base' as EnvironmentType },
  { pH: 12, rgb: [210, 20, 120], name: 'Hồng đậm / Đỏ tía (Base)', env: 'base' as EnvironmentType },
];

export function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (d !== 0) {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

// Approximate RGB to LAB color space conversion
export function rgbToLab(r: number, g: number, b: number): [number, number, number] {
  // Normalize RGB to 0-1
  let rn = r / 255;
  let gn = g / 255;
  let bn = b / 255;

  // Gamma correction
  rn = rn > 0.04045 ? Math.pow((rn + 0.055) / 1.055, 2.4) : rn / 12.92;
  gn = gn > 0.04045 ? Math.pow((gn + 0.055) / 1.055, 2.4) : gn / 12.92;
  bn = bn > 0.04045 ? Math.pow((bn + 0.055) / 1.055, 2.4) : bn / 12.92;

  // Observer = 2°, Illuminant = D65
  let x = (rn * 0.4124 + gn * 0.3576 + bn * 0.1805) / 0.95047;
  let y = (rn * 0.2126 + gn * 0.7152 + bn * 0.0722) / 1.00000;
  let z = (rn * 0.0193 + gn * 0.1192 + bn * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.cbrt(x) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.cbrt(y) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.cbrt(z) : (7.787 * z) + (16 / 116);

  const L = (116 * y) - 16;
  const a = 500 * (x - y);
  const bl = 200 * (y - z);

  return [Math.round(L * 10) / 10, Math.round(a * 10) / 10, Math.round(bl * 10) / 10];
}

// Calculate color distance (Delta E CIE76 or Euclidean in LAB)
export function colorDistanceLab(lab1: [number, number, number], lab2: [number, number, number]): number {
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  );
}

export function analyzeLighting(avgR: number, avgG: number, avgB: number, maxV: number): {
  quality: 'TỐT' | 'TRUNG BÌNH' | 'THẤP';
  message: string;
  isAcceptable: boolean;
} {
  const brightness = (avgR + avgG + avgB) / 3;
  if (brightness < 35) {
    return {
      quality: 'THẤP',
      message: 'Ảnh quá tối. Vui lòng bật thêm đèn hoặc đưa mẫu ra nơi sáng hơn.',
      isAcceptable: false
    };
  }
  if (brightness > 235 || maxV > 250) {
    return {
      quality: 'THẤP',
      message: 'Ảnh quá sáng hoặc bị lóe sáng (glare). Tránh chiếu đèn flash trực tiếp.',
      isAcceptable: false
    };
  }
  if (brightness < 70 || brightness > 210) {
    return {
      quality: 'TRUNG BÌNH',
      message: 'Ánh sáng hơi yếu hoặc hơi chói. Kết quả có thể có sai số nhỏ.',
      isAcceptable: true
    };
  }
  return {
    quality: 'TỐT',
    message: 'Điều kiện ánh sáng tối ưu cho việc phân tích màu.',
    isAcceptable: true
  };
}

export function analyzeSampleColor(
  imageData: ImageData,
  indicatorType: IndicatorType,
  customCalibration?: { pH: number; rgb: [number, number, number] }[]
): {
  estimatedPH: number;
  environment: EnvironmentType;
  detectedColor: string;
  rgb: [number, number, number];
  hsv: [number, number, number];
  lab: [number, number, number];
  confidence: number;
  lightingCheck: { quality: 'TỐT' | 'TRUNG BÌNH' | 'THẤP'; message: string; isAcceptable: boolean };
} {
  const { data, width, height } = imageData;
  // Sample central region (e.g. inner 50% box)
  const startX = Math.floor(width * 0.25);
  const endX = Math.floor(width * 0.75);
  const startY = Math.floor(height * 0.25);
  const endY = Math.floor(height * 0.75);

  let rSum = 0, gSum = 0, bSum = 0, count = 0;
  let maxV = 0;
  const pixels: [number, number, number][] = [];

  for (let y = startY; y < endY; y += 2) {
    for (let x = startX; x < endX; x += 2) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const maxChannel = Math.max(r, g, b);
      if (maxChannel > maxV) maxV = maxChannel;

      rSum += r;
      gSum += g;
      bSum += b;
      pixels.push([r, g, b]);
      count++;
    }
  }

  const avgR = count > 0 ? Math.round(rSum / count) : 128;
  const avgG = count > 0 ? Math.round(gSum / count) : 128;
  const avgB = count > 0 ? Math.round(bSum / count) : 128;

  const rgb: [number, number, number] = [avgR, avgG, avgB];
  const hsv = rgbToHsv(avgR, avgG, avgB);
  const lab = rgbToLab(avgR, avgG, avgB);

  const lightingCheck = analyzeLighting(avgR, avgG, avgB, maxV);

  // Select palette based on indicator type
  let palette = STANDARD_UNIVERSAL_PALETTE;
  if (indicatorType === 'litmus') {
    palette = LITMUS_PALETTE as any;
  } else if (indicatorType === 'phenolphthalein') {
    palette = PHENOLPHTHALEIN_PALETTE as any;
  } else if (indicatorType === 'homemade' && customCalibration && customCalibration.length > 0) {
    palette = customCalibration.map(c => ({
      pH: c.pH,
      rgb: c.rgb,
      name: `pH ${c.pH} (Tự chế)`,
      env: c.pH < 7 ? 'acid' : c.pH === 7 ? 'neutral' : 'base'
    }));
  }

  // Find closest color in palette using Delta E LAB
  let bestMatch = palette[0];
  let minDistance = Infinity;

  for (const item of palette) {
    const itemLab = rgbToLab(item.rgb[0], item.rgb[1], item.rgb[2]);
    const dist = colorDistanceLab(lab, itemLab);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = item;
    }
  }

  // Linear interpolation with neighbors if universal or custom palette has multiple entries
  let estimatedPH = bestMatch.pH;
  if (palette.length > 2) {
    // Sort palette by pH
    const sorted = [...palette].sort((a, b) => a.pH - b.pH);
    const index = sorted.findIndex(p => p.pH === bestMatch.pH);
    if (index > 0 && index < sorted.length - 1) {
      const prev = sorted[index - 1];
      const next = sorted[index + 1];
      const labPrev = rgbToLab(prev.rgb[0], prev.rgb[1], prev.rgb[2]);
      const labNext = rgbToLab(next.rgb[0], next.rgb[1], next.rgb[2]);
      const distPrev = colorDistanceLab(lab, labPrev);
      const distNext = colorDistanceLab(lab, labNext);
      if (distPrev < distNext) {
        // interpolate between prev and best
        const ratio = distPrev / (distPrev + distNext);
        estimatedPH = Math.round((prev.pH + (bestMatch.pH - prev.pH) * ratio) * 10) / 10;
      } else {
        const ratio = distNext / (distPrev + distNext);
        estimatedPH = Math.round((bestMatch.pH + (next.pH - bestMatch.pH) * (1 - ratio)) * 10) / 10;
      }
    }
  }

  // Clamp pH between 0 and 14
  estimatedPH = Math.max(0, Math.min(14, estimatedPH));

  let environment: EnvironmentType = 'neutral';
  if (estimatedPH < 6.8) environment = 'acid';
  else if (estimatedPH > 7.2) environment = 'base';
  else environment = 'neutral';

  // Confidence score based on distance and lighting
  let confidence = Math.max(60, Math.min(98, Math.round(100 - minDistance * 0.8)));
  if (!lightingCheck.isAcceptable) {
    confidence = Math.min(75, confidence - 15);
  }

  return {
    estimatedPH,
    environment,
    detectedColor: bestMatch.name || 'Màu hỗn hợp',
    rgb,
    hsv,
    lab,
    confidence,
    lightingCheck
  };
}
