# REDLINE — Public Asset Audit & Optimization Report

**Audit Date:** November 11, 2026  
**Auditor:** Senior Frontend & Performance Engineer  
**Objective:** Safe identification, archiving, and protection of brand media assets.

---

## 1. Asset Policy & Protection Checklist

All critical brand and customer-facing assets are protected and retained in `public/`:
- **Official Brand Logos:** `public/images/logo/redline-logo.png`, `public/REDLINE_Logo.png`.
- **Favicons & Metadata Icons:** `public/icon.svg`, `public/favicon.svg`, `public/favicon-32x32.png`, `public/favicon-16x16.png`, `public/apple-touch-icon.png`.
- **Active Cinematic Hero Video:** `public/redline_hero.mp4` (active 20.6s muted campaign loop).
- **Active Campaign & Story Models:** `public/images/editorial/brand-campaign-model-official.jpg`, `public/images/editorial/brand-story-official-model.jpg`.
- **Product Collection Catalog:**
  - `public/images/products/redline-oversized-graphic-tee.jpg`
  - `public/images/products/redline-signature-hoodie.jpg`
  - `public/images/products/redline-utility-cargo.jpg`
  - `public/images/products/redline-graphic-long-sleeve.jpg`
  - `public/images/products/redline-oversized-collection-model.jpg`

---

## 2. Safely Archived Assets (Moved to `.archive/`)

The following draft, exploratory, and duplicate assets were verified to have zero references in code and templates. They have been safely segregated into `.archive/` (outside `public/` and git-ignored from production builds):

| File Path in .archive | Original Size | Notes |
|---|---|---|
| `.archive/hero.mp4` | 29.84 MB | Duplicate copy of `redline_hero.mp4` |
| `.archive/images/editorial/brand-campaign-shadow.jpg` | 762.0 KB | Early exploration shot |
| `.archive/images/editorial/brand-campaign-model-portrait.jpg` | 572.2 KB | Alternative campaign portrait |
| `.archive/images/editorial/brand-campaign-streetwear.jpg` | 522.7 KB | Alternative campaign shot |
| `.archive/images/editorial/male-gothic-street-portrait.jpg` | 404.2 KB | Draft campaign photo |
| `.archive/images/editorial/brand-campaign-wide-streetwear.jpg` | 378.8 KB | Wide alternate crop |
| `.archive/images/editorial/brand-campaign-editorial.jpg` | 278.9 KB | Unused editorial draft |
| `.archive/images/editorial/brand-campaign-editorial-male.jpg` | 238.6 KB | Unused model shoot |
| `.archive/images/editorial/brand-story-editorial.jpg` | 214.9 KB | Early formal suit image (replaced) |
| `.archive/images/editorial/brand-story-editorial-hoodie.jpg` | 96.4 KB | Prototype hoodie asset |
| `.archive/images/editorial/brand-campaign-model.jpg` | 77.7 KB | Superseded test model |
| `.archive/images/editorial/drops-hero-banner.jpg` | 31.7 KB | Retired drop header banner |
| `.archive/images/editorial/brand-campaign-model-extracted.jpg` | 29.2 KB | Extracted cutout iteration |
| `.archive/images/editorial/extracted-drops-hero-model.jpg` | 23.1 KB | Prototype cutout iteration |
| `.archive/images/editorial/drops-model-banner.jpg` | 21.2 KB | Superseded banner |

**Total Bandwidth & Storage Saved from Public Directory:** **~34.5 MB**  
**Remaining Public Asset Count:** 16 active files (100% in active production use).
