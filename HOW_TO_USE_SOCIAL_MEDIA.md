# How to Add Social Media Links - Admin Guide

## Quick Start Guide

### Step 1: Access Admin Panel
1. Open your browser and navigate to: `http://localhost:3000/admin/`
2. Log in with your admin credentials

### Step 2: Navigate to Footer Settings
1. In the left sidebar, click on **"Footer"**
2. Look for the **"Social Links"** section
3. Click on the section header to expand it

### Step 3: Add a New Social Media Link
1. Click the **"+ Add Social Link"** button
2. You'll see a new card appear with two fields:
   - **Label (shown in UI)**: Enter the name that visitors will see (e.g., "LinkedIn", "Twitter", "Instagram")
   - **URL (redirect link)**: Enter the full URL to your social media profile (e.g., "https://linkedin.com/company/yourcompany")

### Step 4: Save Your Changes
1. After adding or editing social links, click the **"Save Changes"** button at the top of the page
2. You'll see a success message confirming your changes were saved

### Step 5: View on Website
1. Visit your website homepage (or any page)
2. Scroll to the footer
3. You'll see your social media links displayed

## Examples

### Example 1: Adding LinkedIn
- **Label**: `LinkedIn`
- **URL**: `https://linkedin.com/company/kespra-advisory`

### Example 2: Adding Twitter/X
- **Label**: `Twitter`
- **URL**: `https://twitter.com/kespraadvisory`

### Example 3: Adding Instagram
- **Label**: `Instagram`
- **URL**: `https://instagram.com/kespraadvisory`

### Example 4: Adding YouTube
- **Label**: `YouTube`
- **URL**: `https://youtube.com/@kespraadvisory`

## Interface Overview

The Social Links section looks like this:

```
┌─────────────────────────────────────────────────────────┐
│ Social Links                                        [▼] │
├─────────────────────────────────────────────────────────┤
│ Add social media links that will appear in the footer.  │
│ Each link has a display label and a URL.                │
│                                                          │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Social Link 1                                  [×]│  │
│ ├───────────────────────────────────────────────────┤  │
│ │ Label (shown in UI)  │  URL (redirect link)      │  │
│ │ [LinkedIn         ]  │  [https://linkedin.com/...│  │
│ └───────────────────────────────────────────────────┘  │
│                                                          │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Social Link 2                                  [×]│  │
│ ├───────────────────────────────────────────────────┤  │
│ │ Label (shown in UI)  │  URL (redirect link)      │  │
│ │ [Facebook         ]  │  [https://facebook.com/...│  │
│ └───────────────────────────────────────────────────┘  │
│                                                          │
│ [+ Add Social Link]                                     │
└─────────────────────────────────────────────────────────┘
```

## Tips

✅ **DO:**
- Use descriptive labels (e.g., "LinkedIn", not "LI")
- Include the full URL with https://
- Test your links after saving to make sure they work
- Keep your social media list organized and up-to-date

❌ **DON'T:**
- Leave the URL field empty
- Use incomplete URLs (must start with http:// or https://)
- Add duplicate social media platforms
- Use special characters in labels that might break the display

## Removing a Social Link

To remove a social media link:
1. Click the **×** button in the top-right corner of the social link card
2. The card will be removed immediately
3. Click **"Save Changes"** to confirm the removal

## Editing a Social Link

To edit an existing social media link:
1. Simply update the Label or URL fields directly in the card
2. Click **"Save Changes"** when you're done

## Common Issues

### Issue: Link doesn't appear on the website
**Solution**: Make sure you clicked "Save Changes" after adding the link

### Issue: Link goes to the wrong page
**Solution**: Double-check the URL field - it should be the complete URL including `https://`

### Issue: Can't see the Social Links section
**Solution**: Make sure you're on the "Footer" tab in the admin panel, and click on "Social Links" to expand it

## Support

For technical support or questions, contact your web administrator or refer to the `SOCIAL_MEDIA_FEATURE.md` file for technical details.
