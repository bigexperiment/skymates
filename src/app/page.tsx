'use client';

import { useState, useEffect } from 'react';
import { Plane, Users, Heart, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">&times;</button>
        <h2 className="text-xl font-semibold mb-4 text-center text-black">Sign Up / Login</h2>
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
        >
          <svg className="h-5 w-5 mr-2 bg-white rounded" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.2C12.13 13.41 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.44c-.54 2.9-2.18 5.36-4.64 7.01l7.19 5.6C43.29 37.29 46.1 31.45 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.01-2.99-1.01-6.21 0-9.2l-7.98-6.2C.9 16.18 0 19.01 0 22c0 2.99.9 5.82 2.69 8.11l7.98-6.2z"/><path fill="#EA4335" d="M24 44c6.18 0 11.36-2.05 15.15-5.59l-7.19-5.6c-2.01 1.35-4.59 2.14-7.96 2.14-6.43 0-11.87-3.91-13.33-9.29l-7.98 6.2C6.71 42.18 14.82 48 24 48z"/></g></svg>
          {loading ? 'Loading...' : 'Continue with Google'}
        </button>
        {error && <div className="text-red-600 text-sm mt-3 text-center">{error}</div>}
      </div>
    </div>
  );
}

function AuthHeader({ user, onLoginClick, onLogout }: { user: User | null, onLoginClick: () => void, onLogout: () => void }) {
  return (
    <nav className="w-full bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Plane className="h-7 w-7 text-blue-600 mr-1" />
        <span className="text-2xl font-bold text-gray-900">Skymates</span>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-blue-700 font-medium">Hi {user.email}!</span>
            <button onClick={onLogout} className="text-blue-700 hover:underline font-medium bg-transparent border-none p-0 m-0 cursor-pointer appearance-none">Logout</button>
          </>
        ) : (
          <button onClick={onLoginClick} className="text-blue-700 hover:underline font-medium bg-transparent border-none p-0 m-0 cursor-pointer appearance-none">Sign Up / Login</button>
        )}
      </div>
    </nav>
  );
}

function Footer({ user, onLoginClick, onLogout }: { user: User | null, onLoginClick: () => void, onLogout: () => void }) {
  return (
    <footer className="w-full bg-blue-50 border-t border-blue-200 mt-16 py-6 px-4 text-center text-sm text-gray-700">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="font-bold text-blue-700 text-lg">Skymates</div>
        <nav className="flex flex-wrap gap-4 justify-center md:justify-start">
          <a href="#" className="hover:underline">Home</a>
          <a href="#how" className="hover:underline">How it Works</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <button onClick={onLogout} className="text-blue-700 hover:underline font-medium bg-transparent border-none p-0 m-0 cursor-pointer appearance-none">Logout</button>
          ) : (
            <button onClick={onLoginClick} className="text-blue-700 hover:underline font-medium bg-transparent border-none p-0 m-0 cursor-pointer appearance-none">Sign Up / Login</button>
          )}
          <span className="text-xs text-gray-500">Made with <span className="text-red-500">❤️</span> for the Nepali community.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'passenger' | 'companion'>('passenger');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen">
      <AuthHeader user={user} onLoginClick={() => setModalOpen(true)} onLogout={handleLogout} />
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Helping Nepali travelers connect with companions on the same flight
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            For safety, peace of mind, and community. Find or offer companionship for international journeys.
          </p>
        </div>

        {/* How It Works Section */}
        <div id="how" className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How Skymates Works
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-medium text-blue-700 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                For Nepali Families
              </h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  Traveling parent? Post flight details. We’ll help find a Nepali companion on the same flight.
                </p>
                <p>
                  No login, no hassle. Just fill the form and we’ll connect you if there’s a match.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-medium text-green-700 flex items-center">
                <Heart className="h-6 w-6 mr-2" />
                For Nepali Travelers
              </h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  Flying soon? Sign up as a companion. Help a fellow Nepali traveler feel safe and supported.
                </p>
                <p>
                  It’s quick, easy, and a great way to give back to our community.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Why It Matters
            </h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="text-center">
                <div className="text-2xl mb-2">🛫</div>
                <p><strong>Safer Travel</strong><br/>Elders feel secure with a companion</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <p><strong>Community</strong><br/>Nepalis helping Nepalis</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💝</div>
                <p><strong>Peace of Mind</strong><br/>Families can relax</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Form Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('passenger')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'passenger'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5 inline mr-2" />
              I&apos;m a Parent / Family Member
            </button>
            <button
              onClick={() => setActiveTab('companion')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'companion'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Heart className="h-5 w-5 inline mr-2" />
              I&apos;m a Companion
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 bg-white">
            {activeTab === 'passenger' ? (
              <PassengerForm />
            ) : (
              <CompanionForm />
            )}
          </div>
        </div>

        {/* Recent Requests Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Recent Flight Requests
          </h3>
          <RecentRequests />
        </div>

        {/* Success Stories Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Recent Success Stories
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-700 italic">
                &quot;Found a wonderful companion for my mom&apos;s flight from Dallas to Kathmandu. 
                She felt so much safer and more comfortable during the journey.&quot;
              </p>
              <p className="text-sm text-gray-500 mt-2">- Priya S., Dallas</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-700 italic">
                &quot;I was happy to help an elderly uncle on my flight to Nepal. 
                It felt great to give back to our community.&quot;
              </p>
              <p className="text-sm text-gray-500 mt-2">- Raj K., New York</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Need Help Connecting?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Our team is here to help you find the perfect travel companion or assist with any questions.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a 
              href="tel:7144859360" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              📞 Call (714) 485-9360
            </a>
          </div>
        </div>
      </main>
      <Footer user={user} onLoginClick={() => setModalOpen(true)} onLogout={handleLogout} />
    </div>
  );
}

function PassengerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    passengerName: '',
    from: '',
    to: '',
    airline: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/passenger-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you! Your request has been submitted. We will contact you when we find a match.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          passengerName: '',
          from: '',
          to: '',
          airline: '',
          date: '',
          time: '',
          notes: ''
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to submit request'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Passenger Name *
          </label>
          <input
            type="text"
            name="passengerName"
            required
            value={formData.passengerName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="Name of the person traveling"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From *
          </label>
          <input
            type="text"
            name="from"
            required
            value={formData.from}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="e.g., Dallas (DFW)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To *
          </label>
          <input
            type="text"
            name="to"
            required
            value={formData.to}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="e.g., Kathmandu (KTM)"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Airline *
          </label>
          <input
            type="text"
            name="airline"
            required
            value={formData.airline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            placeholder="e.g., Qatar Airways"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time (optional)
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          />
        </div>
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          placeholder="Any additional information about the passenger or specific needs..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
      >
        Submit Request
      </button>
    </form>
  );
}

function CompanionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    airline: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/companion-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for volunteering! We will contact you when we find a matching passenger.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          from: '',
          to: '',
          airline: '',
          date: '',
          time: '',
          notes: ''
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to submit signup'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit signup. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From *
          </label>
          <input
            type="text"
            name="from"
            required
            value={formData.from}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="e.g., Dallas (DFW)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To *
          </label>
          <input
            type="text"
            name="to"
            required
            value={formData.to}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="e.g., Kathmandu (KTM)"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Airline *
          </label>
          <input
            type="text"
            name="airline"
            required
            value={formData.airline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
            placeholder="e.g., Qatar Airways"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time (optional)
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          />
        </div>
      </div>



      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes (optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          placeholder="Any additional information about your willingness to help..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors"
      >
        Sign Up as Companion
      </button>
    </form>
  );
}

interface PassengerRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  from_location: string;
  to_location: string;
  airline: string;
  flight_date: string;
  notes?: string;
}

interface CompanionSignup {
  id: string;
  name: string;
  email: string;
  phone: string;
  from_location: string;
  to_location: string;
  airline: string;
  flight_date: string;
  notes?: string;
}

function RecentRequests() {
  const [passengerRequests, setPassengerRequests] = useState<PassengerRequest[]>([]);
  const [companionSignups, setCompanionSignups] = useState<CompanionSignup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      // Fetch recent passenger requests
      const passengerResponse = await fetch('/api/recent-requests?type=passenger');
      const passengerData = await passengerResponse.json();
      
      // Fetch recent companion signups
      const companionResponse = await fetch('/api/recent-requests?type=companion');
      const companionData = await companionResponse.json();

      if (passengerResponse.ok) {
        setPassengerRequests(passengerData.data || []);
      }
      
      if (companionResponse.ok) {
        setCompanionSignups(companionData.data || []);
      }
    } catch (error) {
      console.error('Error fetching recent requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading recent requests...</p>
      </div>
    );
  }

  function maskName(name: string) {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return '*';
    return `* ${parts.slice(1).join(' ')}`;
  }

  return (
    <div className="space-y-8">
      {/* Passenger Requests */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Recent Passenger Requests
        </h4>
        {passengerRequests.length > 0 ? (
          <div className="grid gap-3">
            {passengerRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium text-gray-900">Someone</span>
                    <span className="flex items-center text-gray-600"><MapPin className="h-4 w-4 mr-1" />{request.from_location} → {request.to_location}</span>
                    <span className="flex items-center text-gray-600"><Plane className="h-4 w-4 mr-1" />{request.airline}</span>
                    <span className="flex items-center text-gray-600"><Calendar className="h-4 w-4 mr-1" />{formatDate(request.flight_date)}</span>
                  </div>
                  {request.notes && (
                    <div className="text-xs text-gray-500 italic mt-1 md:mt-0">{request.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent passenger requests</p>
        )}
      </div>

      {/* Companion Signups */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Heart className="h-5 w-5 mr-2 text-green-600" />
          Recent Companion Signups
        </h4>
        {companionSignups.length > 0 ? (
          <div className="grid gap-3">
            {companionSignups.slice(0, 5).map((signup) => (
              <div key={signup.id} className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="font-medium text-gray-900">Someone</span>
                    <span className="flex items-center text-gray-600"><MapPin className="h-4 w-4 mr-1" />{signup.from_location} → {signup.to_location}</span>
                    <span className="flex items-center text-gray-600"><Plane className="h-4 w-4 mr-1" />{signup.airline}</span>
                    <span className="flex items-center text-gray-600"><Calendar className="h-4 w-4 mr-1" />{formatDate(signup.flight_date)}</span>
                  </div>
                  {signup.notes && (
                    <div className="text-xs text-gray-500 italic mt-1 md:mt-0">{signup.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent companion signups</p>
        )}
      </div>
    </div>
  );
}
