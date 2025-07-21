#!/bin/bash

# Create .env.local file with Supabase credentials
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=https://wezvgigzjybalfimmeun.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlenZnaWd6anliYWxmaW1tZXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNTYxMDYsImV4cCI6MjA2ODYzMjEwNn0.MRJ1vF712r8k9Y_Sl9cqfmfV2qbmuxM6EF87cDvvhyk
EOF

echo "✅ Environment variables file created successfully!"
echo "📁 File: .env.local"
echo "🔑 Supabase URL and key have been configured"
echo ""
echo "Next steps:"
echo "1. Run the database schema: database-schema.sql in your Supabase SQL editor"
echo "2. Start the development server: npm run dev" 