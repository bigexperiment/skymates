# Skymates - Connect Nepali Travelers

A minimal, no-login web app designed to help match elderly Nepali travelers with young companions on the same flight, ensuring they feel safe and supported on international journeys.

## 🎯 Core Purpose

Many elderly Nepali parents travel alone from the U.S. to Nepal and vice versa. Their families often post in Facebook groups asking for companions, but there's no easy way to connect them with young Nepali travelers who are already on that same flight.

Skymates solves this by:
- Letting parents/families post companion requests
- Letting young travelers sign up as companions
- Matching both sides based on flight date, airline, and route

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skymates
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Set up Supabase Database:
Run the following SQL in your Supabase SQL editor:

```sql
-- Create passenger_requests table
CREATE TABLE passenger_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  passenger_name TEXT NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  airline TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME,
  needs TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create companion_signups table
CREATE TABLE companion_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  airline TEXT NOT NULL,
  flight_date DATE NOT NULL,
  flight_time TIME,
  languages TEXT,
  skills TEXT,
  notes TEXT,
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_passenger_requests_flight ON passenger_requests(airline, flight_date, from_location, to_location);
CREATE INDEX idx_companion_signups_flight ON companion_signups(airline, flight_date, from_location, to_location);
CREATE INDEX idx_passenger_requests_status ON passenger_requests(status);
CREATE INDEX idx_companion_signups_status ON companion_signups(status);
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 App Features

### Homepage Layout
- **Top Header**: Clean Skymates branding with plane icon
- **Intro Section**: Explains the app's purpose
- **Tabbed Form Section**: Two tabs for different user types

### Forms
- **Parent/Family Member Form**: Submit requests for elderly travelers
- **Companion Form**: Sign up to help travelers

### Form Fields
- Basic contact info (name, email, phone optional)
- Flight details (from/to, airline, date, time)
- Specific needs and skills
- Optional notes

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── api/
│   │   ├── passenger-request/
│   │   └── companion-signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── supabase.ts
```

### API Routes
- `POST /api/passenger-request`: Submit passenger requests
- `POST /api/companion-signup`: Submit companion signups

## 🚀 Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🔮 Future Enhancements

- Automatic matching algorithm
- Email notifications
- User authentication
- Admin dashboard for managing matches
- Mobile app
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with ❤️ for the Nepali community to help make international travel safer and more comfortable for elderly travelers.
