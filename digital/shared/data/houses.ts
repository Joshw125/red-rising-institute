import type { HouseId } from '../types';

export interface HouseDef {
  id: HouseId;
  nickname: string;
  color: string;
  homeCastleHexId: number;
  passive: { name: string; effect: string };
  specialUnit: { name: string; effect: string };
  houseRule: { name: string; effect: string };
  oncePerGame: { name: string; effect: string };
  resourceBonus: string;
}

export const HOUSES: Record<HouseId, HouseDef> = {
  Mars: {
    id: 'Mars',
    nickname: 'The Wolves',
    color: '#c0392b',
    homeCastleHexId: 45,
    passive: { name: 'Red Rage', effect: '+1 strength when outnumbered, AND wins ties when outnumbered' },
    specialUnit: { name: 'Howler', effect: 'Counts as 2 Alert units in combat' },
    houseRule: { name: 'Blood Rally', effect: 'Win combat → recall 1 Mars unit from Reserve Track to the combat hex (Alert, acted)' },
    oncePerGame: { name: '—', effect: 'No once-per-game power' },
    resourceBonus: '',
  },
  Minerva: {
    id: 'Minerva',
    nickname: 'The Owls',
    color: '#2980b9',
    homeCastleHexId: 6,
    passive: { name: "Owl's Wisdom", effect: 'See exact counts + readiness in adjacent hexes (req. fog)' },
    specialUnit: { name: 'Tactician', effect: 'Scout within 2 hexes as free ability (req. fog)' },
    houseRule: { name: 'Prepared Positions', effect: 'When defending, At Ease units fight as Alert' },
    oncePerGame: { name: '—', effect: 'No once-per-game power' },
    resourceBonus: 'Highland Gatherers produce 2 Food instead of 1',
  },
  Apollo: {
    id: 'Apollo',
    nickname: 'The Suns',
    color: '#d4ac0d',
    homeCastleHexId: 75,
    passive: { name: "Sun's Reach", effect: 'Free move range is 2 hexes instead of 1' },
    specialUnit: { name: 'Archer', effect: '+1 strength to adjacent allied combat' },
    houseRule: { name: "Healer's Art", effect: 'After any combat Apollo is in, recall 1 Apollo unit from Reserve Track to the combat hex' },
    oncePerGame: { name: '—', effect: 'No once-per-game power' },
    resourceBonus: '',
  },
  Diana: {
    id: 'Diana',
    nickname: 'The Shadows',
    color: '#7d3c98',
    homeCastleHexId: 52,
    passive: { name: 'The Hunt', effect: 'Win ANY combat → surviving Diana units may move 1 hex' },
    specialUnit: { name: 'Shadow', effect: 'Moves through enemy hexes without triggering combat' },
    houseRule: { name: 'Forest Hunters', effect: 'Withdraws from forest hexes hide the Removal Marker for 1 round' },
    oncePerGame: { name: '—', effect: 'No once-per-game power' },
    resourceBonus: 'Up to 2 units in Forest hexes exempt from upkeep',
  },
};
