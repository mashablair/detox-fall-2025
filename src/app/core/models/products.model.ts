// Detox Fall 2025 — Product schema & starter data
// This file defines the product interfaces used in onboarding "What I already have" step.
// Feel free to edit in-place; we can split into separate files later if needed.

// ---- Types ----
export type RegionCode = 'us' | 'eu' | 'ru';

export type ProductType = 'supplement' | 'essential_oil';

export type ProductCategory =
  | 'core' // must-have to start the program
  | 'oils_basic' // basic oils kit
  | 'oils_advanced' // add-ons for advanced version
  | 'support'; // misc support items (caps, castor oil, binders)

export type ProgramLevel = 'base' | 'advanced';

// How to take a product (human-readable + structured bits for future logic)
export interface TakeInstruction {
  mode?: 'oral' | 'topical' | 'aromatic';
  timing?: 'am' | 'noon' | 'pm' | 'bedtime' | 'with_meal' | 'empty_stomach' | 'as_needed';
  frequency?: 'daily' | '1-2x/day' | '3x/day' | 'cycle' | 'as_needed';
  amount?: string; // e.g., "1 sachet", "1–2 softgels", "3–5 drops"
  notes?: string; // freeform extra details
}

// Region-specific naming/substitutions
export interface RegionVariant {
  altName?: string; // localized/legacy name
  substitutes?: string[]; // acceptable non-dōTERRA alternatives
}

export interface Product {
  id: string; // unique stable id, kebab/slug preferred
  name: string; // canonical program name (en)
  description?: string;
  takes?: TakeInstruction[]; // one or more instructions (e.g., AM vs PM)
  altName?: string; // quick alt label shown next to name (global)
  category: ProductCategory;
  level?: ProgramLevel; // base/advanced flag to unlock gating rules
  regions?: Partial<Record<RegionCode, RegionVariant>>; // per-region metadata
  region?: RegionCode[]; // where this exact SKU exists (for filtering)
  type: ProductType;
  imageURL?: string; // CDN path later
  optional?: boolean; // if true, user can skip without warning
  source?: 'catalog' | 'user'; // catalog = immutable core product, user = custom/editable
  userId?: string; // for user-created products (stored in DB later)
}
