# Setting Up Supabase for SkillLink

## Current Status

Your application is currently using **placeholder Supabase credentials**, which is why authentication (sign up/sign in) is failing with "Failed to fetch" errors.

## Quick Fix

You have two options:

### Option 1: Set Up Real Supabase (Recommended for Production)

1. **Create a Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create a New Project**
   - Click "New Project"
   - Choose a name (e.g., "SkillLink")
   - Set a database password (save this!)
   - Select a region close to you
   - Wait for the project to be created (~2 minutes)

3. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy the **anon/public key** (long string starting with `eyJ...`)

4. **Update `.env.local`**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
   ```

5. **Restart the Dev Server**
   ```bash
   # Stop the current server (Ctrl+C)
   pnpm dev
   ```

### Option 2: Disable Auth Temporarily (For Testing)

If you just want to test the app without authentication:

1. Comment out auth-related middleware
2. Use mock data instead of Supabase queries
3. This is **not recommended** for production

## Database Setup (After Creating Supabase Project)

You'll need to set up the database schema. The app expects these tables:

- `profiles` - User profiles
- `products` - Product listings
- `services` - Service offerings  
- `requests` - User requests

You can find SQL migration scripts in the `scripts/` directory (if available) or create them manually in the Supabase SQL editor.

## Troubleshooting

### "Failed to fetch" Error
- **Cause**: Invalid or placeholder Supabase credentials
- **Fix**: Update `.env.local` with real credentials and restart server

### Auth Not Working After Setup
- Check that you've restarted the dev server
- Verify credentials are correct (no extra spaces)
- Check browser console for specific errors

### Database Errors
- Ensure tables are created in Supabase
- Check Row Level Security (RLS) policies
- Verify user has proper permissions

## Current Placeholder Values

Your `.env.local` currently has:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

These need to be replaced with real values from your Supabase project.

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
