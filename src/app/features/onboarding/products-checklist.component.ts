import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { ImageService } from '../../core/services/image.service';
import { INITIAL_PRODUCTS } from '../../core/data/products.data';
import { Product, RegionCode } from '../../core/models/products.model';

@Component({
  selector: 'app-products-checklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-checklist.component.html',
  styles: [],
})
export class ProductsChecklistComponent implements OnInit {
  // Available regions
  readonly regions: RegionCode[] = ['us', 'eu', 'ru'];

  // Active tab for region selection
  activeTab = signal<RegionCode>('us');

  // Checklist state - track which products user has
  checkedProducts = signal<Set<string>>(new Set());

  // Get user's region based on their country
  userRegion = computed<RegionCode>(() => {
    const profile = this.userService.userProfile();
    if (!profile?.country) return 'us';
    return this.mapCountryToRegion(profile.country);
  });

  // Filter products by active tab region
  regionProducts = computed<Product[]>(() => {
    const region = this.activeTab();
    return INITIAL_PRODUCTS.filter((product) => product.region?.includes(region));
  });

  // Group products by level
  baseProducts = computed<Product[]>(() => {
    return this.regionProducts().filter((p) => p.level === 'base');
  });

  advancedProducts = computed<Product[]>(() => {
    return this.regionProducts().filter((p) => p.level === 'advanced');
  });

  constructor(private userService: UserService, public imageService: ImageService) {}

  ngOnInit(): void {
    // Set active tab to user's region by default
    this.activeTab.set(this.userRegion());
  }

  /**
   * Maps a country name to a region code
   */
  mapCountryToRegion(country: string): RegionCode {
    const countryLower = country.toLowerCase();

    // US region
    if (
      countryLower.includes('united states') ||
      countryLower.includes('usa') ||
      countryLower === 'us'
    ) {
      return 'us';
    }

    // Russia region
    if (
      countryLower.includes('russia') ||
      countryLower.includes('росси') ||
      countryLower.includes('рф')
    ) {
      return 'ru';
    }

    // European countries
    const europeanCountries = [
      'austria',
      'belgium',
      'bulgaria',
      'croatia',
      'cyprus',
      'czech',
      'denmark',
      'estonia',
      'finland',
      'france',
      'germany',
      'greece',
      'hungary',
      'ireland',
      'italy',
      'latvia',
      'lithuania',
      'luxembourg',
      'malta',
      'netherlands',
      'poland',
      'portugal',
      'romania',
      'slovakia',
      'slovenia',
      'spain',
      'sweden',
      'norway',
      'switzerland',
      'united kingdom',
      'uk',
      'великобритан',
      'герман',
      'франц',
      'испан',
      'итал',
      'польш',
    ];

    if (europeanCountries.some((eu) => countryLower.includes(eu))) {
      return 'eu';
    }

    // Default to US if unknown
    return 'us';
  }

  /**
   * Toggle product in checklist
   */
  toggleProduct(productId: string): void {
    const current = new Set(this.checkedProducts());
    if (current.has(productId)) {
      current.delete(productId);
    } else {
      current.add(productId);
    }
    this.checkedProducts.set(current);
  }

  /**
   * Check if product is checked
   */
  isChecked(productId: string): boolean {
    return this.checkedProducts().has(productId);
  }

  /**
   * Get region display name in Russian
   */
  getRegionLabel(region: RegionCode): string {
    const labels: Record<RegionCode, string> = {
      us: 'США',
      eu: 'Европа',
      ru: 'Россия',
    };
    return labels[region];
  }

  /**
   * Get product substitute info for current region
   */
  getSubstituteInfo(product: Product): string | null {
    const region = this.activeTab();
    if (product.regions && product.regions[region]?.substitutes) {
      const substitutes = product.regions[region]!.substitutes!;
      return substitutes.join(', ');
    }
    return null;
  }
}
