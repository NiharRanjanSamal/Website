# Social Media Links Feature

## Overview
This feature allows admins to add multiple social media links through the admin panel. Each social media link has two fields:
1. **Label** - The text displayed in the UI (e.g., "LinkedIn", "Twitter", "Facebook")
2. **URL** - The link that users will be redirected to when they click on it

## What Was Changed

### 1. Admin Panel (`admin/editor.html`)
- **Updated**: The "Social Links" section in the Footer tab
- **Old Approach**: Fixed fields for LinkedIn and Facebook URLs only
- **New Approach**: Dynamic list where admins can add unlimited social media links
- **Features**:
  - Add new social media links with the "+ Add Social Link" button
  - Remove existing links with the × button
  - Each link has a label (display name) and URL field

### 2. Admin JavaScript (`admin/editor.js`)
- **Added**: New `socialLink` template function
- **Template Structure**: 
  - Creates a card with two fields:
    - Label input (for the text shown in UI)
    - URL input (for the redirect link)
  - Includes remove button functionality
- **Added**: Default item initialization for new social links (`{ label: 'Social Media', url: '' }`)

### 3. Data Structure (`data/content.json`)
- **Updated**: `shared.footer` section
- **Removed**: Individual `linkedIn` and `facebook` fields
- **Added**: `socialLinks` array containing objects with `label` and `url` properties
- **Example**:
```json
"socialLinks": [
  {
    "label": "LinkedIn",
    "url": "https://linkedin.com/company/kespra-advisory"
  },
  {
    "label": "Facebook",
    "url": "https://facebook.com/kespraadvisory"
  },
  {
    "label": "Twitter",
    "url": "https://twitter.com/kespraadvisory"
  }
]
```

### 4. Content Loader (`content-loader.js`)
- **Added**: New `addSocialLinks()` function
- **Functionality**:
  - Clears existing static social links
  - Dynamically creates `<a>` elements for each social link from the data
  - Sets proper attributes (href, target="_blank", rel="noopener noreferrer")
  - Called automatically when content loads

### 5. Frontend HTML Files (`index.html`, `contact.html`, `services.html`)
- **Updated**: Footer social section
- **Old**: Static hardcoded links with data attributes
- **New**: Empty container with comment: `<!-- Social links will be dynamically loaded here -->`
- **Behavior**: Social links are populated dynamically by JavaScript when the page loads

## How to Use

### For Admins:
1. Navigate to `http://localhost:3000/admin/`
2. Log in with your credentials
3. Click on "Footer" in the left sidebar
4. Expand the "Social Links" section
5. Click "+ Add Social Link" to add a new social media link
6. Fill in:
   - **Label**: The text that will appear on the website (e.g., "Instagram", "LinkedIn")
   - **URL**: The full URL to your social media profile (e.g., "https://instagram.com/yourcompany")
7. Click "Save Changes" at the top
8. The changes will immediately reflect on the website

### To Remove a Social Link:
1. Click the × button on the social link card you want to remove
2. Click "Save Changes"

### To Edit a Social Link:
1. Simply update the Label or URL fields
2. Click "Save Changes"

## Technical Details

### Data Flow:
1. Admin edits social links in admin panel → saves
2. Data saved to `data/content.json` via API (`/api/content`)
3. Frontend loads content via `content-loader.js`
4. `addSocialLinks()` function processes the `socialLinks` array
5. Social links dynamically appear in the footer of all pages

### Browser Compatibility:
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Uses vanilla JavaScript (no additional dependencies)
- Graceful fallback if JavaScript is disabled (links won't appear)

### SEO Considerations:
- All social links have `target="_blank"` (opens in new tab)
- All external links have `rel="noopener noreferrer"` for security

## Files Modified:
1. `admin/editor.html` - Updated Social Links section UI
2. `admin/editor.js` - Added socialLink template and logic
3. `data/content.json` - Changed from individual fields to socialLinks array
4. `content-loader.js` - Added addSocialLinks() function
5. `index.html` - Updated footer to use dynamic loading
6. `contact.html` - Updated footer to use dynamic loading
7. `services.html` - Updated footer to use dynamic loading

## Future Enhancements (Optional):
- Add icon selection dropdown for each social media platform
- Add support for Font Awesome or custom SVG icons
- Add validation to ensure URLs are properly formatted
- Add drag-and-drop to reorder social links
- Add preview feature to see how links will appear before saving
