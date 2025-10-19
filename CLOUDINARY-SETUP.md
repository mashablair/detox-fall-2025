# Cloudinary Setup Guide

## 📦 Step 1: Create Cloudinary Account

1. Go to [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Sign up for a **free account** (no credit card required)
3. After registration, you'll be taken to your Dashboard

## 🔑 Step 2: Get Your Cloud Name

On your Cloudinary Dashboard, you'll see:

- **Cloud name**: `dxxxxxxxxx` (or custom name if you set one)
- **API Key**: _(you don't need this for front-end image delivery)_
- **API Secret**: _(you don't need this for front-end image delivery)_

Copy your **Cloud Name** - you'll need this!

## ⚙️ Step 3: Update Environment Files

Replace `YOUR_CLOUD_NAME` in both environment files with your actual cloud name:

### `/src/environments/environment.ts`

```typescript
cloudinary: {
  cloudName: 'your-actual-cloud-name', // ← Replace this!
  folder: 'detox-fall',
}
```

### `/src/environments/environment.prod.ts`

```typescript
cloudinary: {
  cloudName: 'your-actual-cloud-name', // ← Replace this!
  folder: 'detox-fall',
}
```

## 📸 Step 4: Prepare Your Product Images

Create 8 product images with these exact filenames (`.webp` format recommended):

1. `vmg-plus.webp` - VMG+™
2. `eo-mega.webp` - EO Mega™
3. `pb-restore.webp` - PB Restore®
4. `revitazen-detox-blend.webp` - RevitaZen™ Detoxification Blend
5. `revitazen-advanced-organ.webp` - RevitaZen™ Advanced Organ Support Complex
6. `gx-assist.webp` - GX Assist®
7. `terrazyme.webp` - TerraZyme™
8. `ddr-prime.webp` - DDR Prime® Cellular Complex

**Image Recommendations:**

- Format: WebP (best compression) or JPG
- Size: 800×800px or larger (Cloudinary will auto-resize)
- Quality: High (Cloudinary will optimize)

## ☁️ Step 5: Upload Images to Cloudinary

### Option A: Web Upload (Easiest)

1. Go to your Cloudinary Dashboard → **Media Library**
2. Click **Upload** button (top right)
3. Select all 8 product images
4. **Important:** Before uploading, set the folder:
   - Click **Advanced Options**
   - In **Folder** field, type: `detox-fall/products`
5. Click **Upload**

### Option B: Bulk Upload

1. In Media Library, click **Upload**
2. Enable **Bulk Upload**
3. Drag & drop all images at once
4. Set folder to `gut-reset/products`
5. Upload

### Verify Upload

After upload, navigate to: **Media Library** → `gut-reset` folder → `products` folder

You should see all 8 images there.

## 🧪 Step 6: Test Integration

### Test in Browser Console

Open your app in browser, open DevTools Console, and run:

```javascript
// Assuming you've injected ImageService in a component
const imageService = // get service instance
const testUrl = imageService.getProductImage('vmg-plus.webp', { width: 300 });
console.log(testUrl);
// Should output: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/w_300,c_fill/gut-reset/products/vmg-plus.webp
```

### Test in Component

```typescript
import { ImageService } from '@app/core/services/image.service';

export class YourComponent {
  constructor(private imageService: ImageService) {}

  ngOnInit() {
    const url = this.imageService.getProductImage('vmg-plus.webp', { width: 400 });
    console.log('Product image URL:', url);
  }
}
```

### Test in Template

```html
<img [src]="imageService.getProductImage(product.imageURL, { width: 300 })" [alt]="product.name" />
```

## 🎨 Step 7: Image Transformations

The `ImageService` supports automatic transformations:

```typescript
// Thumbnail (300x300, cropped to fill)
imageService.getProductImage('vmg-plus.webp', { width: 300, height: 300 });

// Larger card (600px wide, auto height)
imageService.getProductImage('vmg-plus.webp', { width: 600 });

// Force format (convert to JPG)
imageService.getProductImage('vmg-plus.webp', { format: 'jpg' });

// Optimize quality (60% quality)
imageService.getProductImage('vmg-plus.webp', { quality: 60 });
```

## 📁 Folder Structure in Cloudinary

Your Cloudinary should have this structure:

```
gut-reset/
├── products/
│   ├── vmg-plus.webp
│   ├── eo-mega.webp
│   ├── pb-restore.webp
│   ├── revitazen-detox-blend.webp
│   ├── revitazen-advanced-organ.webp
│   ├── gx-assist.webp
│   ├── terrazyme.webp
│   └── ddr-prime.webp
├── profiles/          (for future user avatars)
└── assets/            (for other images)
```

## 🆘 Troubleshooting

### Images Not Loading?

1. **Check cloud name**: Make sure it's updated in both environment files
2. **Check folder path**: Images must be in `gut-reset/products/` folder
3. **Check filenames**: Must match exactly (case-sensitive)
4. **Check browser console**: Look for 404 errors with the failing URL

### Wrong URLs Generated?

- Verify `environment.cloudinary.cloudName` is correct
- Check that `environment.cloudinary.folder` is set to `'gut-reset'`
- Service automatically appends `/products/` to the folder path

### Slow Loading?

- Cloudinary first-time loads can be slow (it's processing)
- Subsequent loads are cached and super fast
- Use smaller width/height options to load faster thumbnails

## 💰 Free Tier Limits

Cloudinary free tier includes:

- **25 GB storage**
- **25 GB bandwidth/month**
- **Unlimited transformations**

For your 8 product images (~200KB each) + future user uploads, you'll be well within limits!

## 🚀 Next Steps

Once images are uploaded:

1. Your app will automatically serve optimized images via Cloudinary
2. Future user-uploaded images can use the same system
3. You can update product images anytime without redeploying code
4. All images are served from global CDN for fast worldwide delivery

---

**Questions?** Check [Cloudinary Documentation](https://cloudinary.com/documentation) or ping me!
