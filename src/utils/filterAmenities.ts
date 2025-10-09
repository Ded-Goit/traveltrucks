import type { Camper } from '@/types/camper';
import { AMENITIES } from '@/constants/camperFeatures';

export function getAvailableAmenities(camper: Camper) {
  return AMENITIES.filter((a) => {
    if (a.key === 'transmission') return camper.transmission === 'automatic';
    if (a.key === 'engine') return !!camper.engine;
    return camper[a.key as keyof Camper] === true;
  });
}
