# How to Use Password Visibility Toggle

## What Is This Feature?

The password visibility toggle allows you to **show or hide your password** as you type it. This helps you:
- ✅ Verify you've typed your password correctly
- ✅ Avoid typos when creating or changing passwords
- ✅ Still maintain security by hiding it again

## Where You'll See It

### 1. Login Page
When you visit `http://localhost:3000/admin/`, you'll see an **eye icon** inside the password field.

### 2. Settings Page (Change Password)
When you're logged in and go to **Settings** → **Change Password**, you'll see eye icons on:
- Current Password field
- New Password field
- Confirm New Password field

## How to Use It

### Step 1: Look for the Eye Icon
Inside each password field, on the **right side**, you'll see a small eye icon: 👁️

### Step 2: Click the Eye Icon
- **Click once** → Password becomes visible (you can see what you typed)
- **Click again** → Password becomes hidden again (shows dots/bullets)

### Step 3: Verify Your Password
Use this feature when you want to:
- Check if you typed your password correctly
- Make sure there are no typos
- Verify special characters are in the right place

## Visual Guide

### Before Clicking (Password Hidden)
```
┌─────────────────────────────────────────┐
│ Password                                 │
│ ┌────────────────────────────────┬────┐ │
│ │ ••••••••                       │ 👁️ │ │ ← Click this eye icon
│ └────────────────────────────────┴────┘ │
└─────────────────────────────────────────┘
```

### After Clicking (Password Visible)
```
┌─────────────────────────────────────────┐
│ Password                                 │
│ ┌────────────────────────────────┬────┐ │
│ │ MyPassword123!                 │ 👁️⃠│ │ ← Eye icon changes
│ └────────────────────────────────┴────┘ │
└─────────────────────────────────────────┘
```

## Tips

### ✅ Best Practices
1. **Use it to verify**: When creating a new password, click to verify it's correct
2. **Hide it after**: Don't leave passwords visible - click again to hide
3. **Check your surroundings**: Make sure no one is watching your screen before showing your password

### 🔒 Security Tips
- Only show your password when you're alone
- Always hide it again when done verifying
- Don't leave your password visible while stepping away from your computer
- Remember: This is a convenience feature, not a replacement for being careful

## Keyboard Users

If you prefer using your keyboard:
1. Press **Tab** to navigate to the password field
2. Press **Tab** again to focus the eye icon button
3. Press **Space** or **Enter** to toggle visibility
4. Continue tabbing to the next field

## Common Questions

### Q: Is it safe to show my password?
**A:** Yes, but only when you're alone. The password is still encrypted when sent to the server. The eye icon only changes what you see on your screen.

### Q: Will my password be visible to others if I show it?
**A:** Only if they're looking at your screen. The password is only visible on your device.

### Q: Does clicking the eye icon submit the form?
**A:** No, it only toggles visibility. You still need to click "Sign In" or "Update Password" to submit.

### Q: Can I use this on mobile?
**A:** Yes! The feature works on mobile devices too. Just tap the eye icon.

### Q: What if I forget to hide my password?
**A:** The password will be hidden again automatically when you refresh the page or close the browser.

## Troubleshooting

### Eye icon not working?
- **Refresh the page** and try again
- Make sure **JavaScript is enabled** in your browser
- Try a different browser (Chrome, Firefox, Safari, Edge)

### Can't see the eye icon?
- The icon appears **inside the password field** on the right side
- If your browser window is very small, try making it larger
- Clear your browser cache and refresh

### Eye icon covered by autocomplete?
- Click somewhere else first, then click the password field
- Disable browser password autocomplete if needed

## Support

If you have any issues with the password visibility toggle, contact your system administrator or refer to the technical documentation in `PASSWORD_VISIBILITY_FEATURE.md`.
