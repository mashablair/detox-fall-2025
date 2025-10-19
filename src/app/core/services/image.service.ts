import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Service for handling image URLs with Cloudinary support
 * Supports both Cloudinary CDN and local assets fallback
 */
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  /**
   * Get product image URL with optional transformations
   * @param filename - Image filename (e.g., 'vmg-plus.webp') or full URL for user uploads
   * @param options - Optional transformation parameters
   * @returns Full Cloudinary URL with transformations
   */
  getProductImage(
    filename: string | undefined,
    options?: {
      width?: number;
      height?: number;
      quality?: number; // 1-100, default auto
      format?: 'webp' | 'jpg' | 'png'; // force format
    }
  ): string {
    // Return placeholder if no filename provided
    if (!filename) {
      return this.getPlaceholder();
    }

    // If it's already a full URL (e.g., user-uploaded to external storage), return as-is
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }

    // If Cloudinary is not configured, fall back to local assets
    if (!environment.cloudinary?.cloudName) {
      return `/assets/products/${filename}`;
    }

    // Build Cloudinary transformation string
    const transformations: string[] = [];

    if (options?.width) {
      transformations.push(`w_${options.width}`);
    }
    if (options?.height) {
      transformations.push(`h_${options.height}`);
    }
    if (options?.quality) {
      transformations.push(`q_${options.quality}`);
    }
    if (options?.format) {
      transformations.push(`f_${options.format}`);
    }

    // Add smart defaults for product images
    // Use 'fit' mode to show entire product without cropping
    if (transformations.length > 0) {
      transformations.push('c_fit'); // fit entire image within dimensions without cropping
    }

    const transformString = transformations.length > 0 ? `${transformations.join(',')}/` : '';

    // Build full Cloudinary URL
    const { cloudName, folder } = environment.cloudinary;
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${folder}/products/${filename}`;
  }

  /**
   * Get avatar/profile image URL
   */
  getProfileImage(filename: string | undefined, size?: number): string {
    if (!filename) {
      return this.getPlaceholder('avatar');
    }

    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }

    if (!environment.cloudinary?.cloudName) {
      return `/assets/profiles/${filename}`;
    }

    const { cloudName, folder } = environment.cloudinary;
    const transformString = size ? `w_${size},h_${size},c_fill,g_face/` : '';

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${folder}/profiles/${filename}`;
  }

  /**
   * Get general asset image URL
   */
  getAssetImage(filename: string | undefined): string {
    if (!filename) {
      return this.getPlaceholder();
    }

    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }

    if (!environment.cloudinary?.cloudName) {
      return `/assets/${filename}`;
    }

    const { cloudName, folder } = environment.cloudinary;
    return `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/assets/${filename}`;
  }

  /**
   * Get placeholder image
   */
  getPlaceholder(type: 'product' | 'avatar' | 'general' = 'product'): string {
    // You can customize placeholders or use a service like placeholder.com
    const placeholders = {
      product: '/assets/placeholders/product-placeholder.png',
      avatar: '/assets/placeholders/avatar-placeholder.png',
      general: '/assets/placeholders/image-placeholder.png',
    };
    return placeholders[type];
  }

  /**
   * Preload an image (useful for critical images)
   */
  preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }
}
