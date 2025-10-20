import { Product, RegionCode } from '../models/products.model';

// Note: imageURL contains just the filename. The ImageService will build full Cloudinary URLs.
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vmg-plus',
    name: 'VMG+™',
    description:
      'Superfoods blend designed to meet wide daily nutritional needs and promote foundational health and lifelong vitality.',
    takes: [
      {
        mode: 'oral',
        timing: 'am',
        frequency: 'daily',
        amount: '1 sachet',
        notes: 'Mix in water.',
      },
    ],
    level: 'base',
    region: ['us', 'eu', 'ru'],
    type: 'supplement',
    imageURL: 'vmg-plus.png',
    source: 'catalog',
  },
  {
    id: 'eo-mega',
    name: 'EO Mega™',
    description:
      'Rich source of omega-3 essential fatty acids to support healthy body systems with emphasis on heart and cardiovascular function.',
    takes: [
      {
        mode: 'oral',
        timing: 'am',
        frequency: '1-2x/day',
        amount: '1–3 softgels total/day',
        notes: 'Typically AM and PM.',
      },
    ],
    level: 'base',
    region: ['us', 'eu', 'ru'],
    type: 'supplement',
    imageURL: 'eo-mega.png',
    source: 'catalog',
  },
  {
    id: 'pb-restore',
    name: 'dōTERRA PB Restore®',
    description:
      'Encapsulation technology delivers pre-, pro-, and postbiotics to targeted areas in the digestive system.',
    takes: [
      {
        mode: 'oral',
        timing: 'with_meal',
        frequency: 'daily',
        amount: '1 capsule',
        notes: 'Take with AM meal. Do not take at the same time as GX Assist.',
      },
    ],
    level: 'base',
    region: ['us', 'eu'],
    type: 'supplement',
    imageURL: 'pb-restore.png',
    source: 'catalog',
  },
  {
    id: 'revitazen-detox-blend',
    name: 'RevitaZen™ Detoxification Blend',
    description:
      'Synergistic blend of essential oils to support liver, kidney, and digestive function while promoting gentle detoxification.',
    takes: [
      {
        mode: 'oral',
        frequency: '3x/day',
        amount: '3–5 drops',
        notes: 'Internally in a veggie capsule or in water.',
      },
      {
        mode: 'topical',
        timing: 'as_needed',
        amount: 'few drops',
        notes: 'Apply over abdomen or liver; use with castor oil for enhanced topical support.',
      },
    ],
    level: 'base',
    region: ['us'],
    type: 'essential_oil',
    imageURL: 'revitazen-detox-blend.png',
    source: 'catalog',
  },
  {
    id: 'revitazen-advanced-organ',
    name: 'RevitaZen™ Advanced Organ Support Complex',
    description:
      'Daily support for liver, kidney, and colon detoxification with clinically studied botanicals and CPTG® essential oils.',
    takes: [
      {
        mode: 'oral',
        timing: 'with_meal',
        frequency: 'daily',
        amount: '1 capsule',
        notes: 'AM meal; PM capsule as needed.',
      },
    ],
    level: 'base',
    region: ['us'],
    type: 'supplement',
    imageURL: 'revitazen-advanced-organ.png',
    source: 'catalog',
  },
  {
    id: 'gx-assist',
    name: 'GX Assist®',
    description:
      'GI cleansing formula combining essential oils and caprylic acid to create an unfriendly environment for potential threats in the digestive tract.',
    takes: [
      {
        mode: 'oral',
        timing: 'noon',
        frequency: '1-2x/day',
        amount: '1–2 softgels',
        notes:
          'Take with noon and PM meals for a total of 3 softgels/day. Increase fiber intake; separate from PB Restore.',
      },
    ],
    level: 'advanced',
    region: ['us', 'eu', 'ru'],
    type: 'supplement',
    imageURL: 'gx-assist.png',
    source: 'catalog',
  },
  {
    id: 'terrazyme',
    name: 'TerraZyme™',
    description:
      'Proprietary blend of active whole‑food enzymes that support healthy digestion and metabolism of enzyme‑deficient, processed food.',
    takes: [
      {
        mode: 'oral',
        timing: 'am',
        frequency: '1-2x/day',
        amount: '1 capsule',
        notes: 'AM and PM on empty stomach; 1–2 capsules with meals as needed.',
      },
    ],
    level: 'base',
    regions: {
      ru: { substitutes: ['пищеварительные ферменты', 'папаин', 'бромелайн'] },
      eu: { substitutes: ['bromelain', 'papain', 'broad‑spectrum digestive enzymes'] },
    },
    region: ['us', 'eu'],
    type: 'supplement',
    imageURL: 'terrazyme.png',
    source: 'catalog',
  },
  {
    id: 'ddr-prime',
    name: 'DDR Prime® Cellular Complex',
    description:
      'Essential oil cellular complex to support cellular health, function, and renewal.',
    takes: [
      {
        mode: 'oral',
        timing: 'am',
        frequency: '1-2x/day',
        amount: '1–2 softgels',
        notes: 'Morning and evening meals.',
      },
    ],
    level: 'advanced',
    region: ['us', 'eu', 'ru'],
    type: 'supplement',
    imageURL: 'ddr-prime.png',
    source: 'catalog',
  },
];

const ADD_PRODUCTS = [
  'castor oil',
  'castor oil packs',
  'activated charcoal',
  'base oils kit',
  'fiber',
  'advanced protocol EOs',
];

export const OTHER_PRODUCTS = [
  {
    id: 'recharge',
    name: 'Recharge',
    imageURL: 'recharge.png',
  },
  {
    id: 'serenity',
    name: 'Serenity',
    imageURL: 'serenity.png',
  },
];

// ---- Helpers (optional) ----
export const byRegion = (region: RegionCode) =>
  INITIAL_PRODUCTS.filter((p) => !p.region || p.region.includes(region));
