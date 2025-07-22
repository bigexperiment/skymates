'use client';

import { useState, useEffect } from 'react';
import { Plane, Users, Heart, Calendar, MapPin } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'passenger' | 'companion'>('passenger');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Plane className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Skymates</h1>
          </div>
          <div className="text-center mt-2">
            <p className="text-gray-600">
              Need help? Call us at <a href="tel:7144859360" className="text-blue-600 font-medium hover:text-blue-800">(714) 485-9360</a>
            </p>
          </div>
        </div>
      </header>

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
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            How Skymates Works
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Families */}
            <div className="space-y-4">
              <h4 className="text-xl font-medium text-blue-700 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                For Nepali Families
              </h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Is your elderly parent traveling alone?</strong> Many Nepali parents travel between the US and Nepal alone, and families worry about their safety and comfort during long international flights.
                </p>
                <p>
                  <strong>We help you find a companion</strong> - a young Nepali traveler who&apos;s already on the same flight and willing to help. They can assist with forms, language barriers, or simply provide company during the journey.
                </p>
                <p>
                  <strong>It&apos;s completely free</strong> and no registration required. Just fill out a simple form with your parent&apos;s flight details, and we&apos;ll connect you with potential companions.
                </p>
              </div>
            </div>

            {/* For Travelers */}
            <div className="space-y-4">
              <h4 className="text-xl font-medium text-green-700 flex items-center">
                <Heart className="h-6 w-6 mr-2" />
                For Nepali Travelers
              </h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Want to help our community?</strong> If you&apos;re already traveling between the US and Nepal, you can make a big difference by offering companionship to elderly travelers.
                </p>
                <p>
                  <strong>It&apos;s simple and meaningful</strong> - just let us know your flight details, and we&apos;ll match you with families looking for help. You might help someone&apos;s parent feel safer and more comfortable during their journey.
                </p>
                <p>
                  <strong>No obligation</strong> - you can choose to help or not. Even small gestures like helping with forms or just being there for conversation can make a huge difference.
                </p>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <h5 className="text-lg font-semibold text-gray-900 mb-3 text-center">
              Why This Matters for Our Nepali Community
            </h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="text-center">
                <div className="text-2xl mb-2">🛫</div>
                <p><strong>Safer Travel</strong><br/>Elderly parents feel more secure with a companion on long international flights</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <p><strong>Community Support</strong><br/>Young Nepalis helping elders - it&apos;s our cultural value of respecting and caring for seniors</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💝</div>
                <p><strong>Peace of Mind</strong><br/>Families can relax knowing their parents have support during their journey</p>
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
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-lg p-8 text-center text-white">
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
            Email (optional)
          </label>
          <input
            type="email"
            name="email"
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
            Phone (optional)
          </label>
          <input
            type="tel"
            name="phone"
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
          <select
            name="airline"
            required
            value={formData.airline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
          >
            <option value="">Select airline</option>
            <option value="Qatar Airways">Qatar Airways</option>
            <option value="Emirates">Emirates</option>
            <option value="Turkish Airlines">Turkish Airlines</option>
            <option value="Etihad Airways">Etihad Airways</option>
            <option value="Air India">Air India</option>
            <option value="Other">Other</option>
          </select>
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
          Phone (optional)
        </label>
        <input
          type="tel"
          name="phone"
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
          <select
            name="airline"
            required
            value={formData.airline}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900"
          >
            <option value="">Select airline</option>
            <option value="Qatar Airways">Qatar Airways</option>
            <option value="Emirates">Emirates</option>
            <option value="Turkish Airlines">Turkish Airlines</option>
            <option value="Etihad Airways">Etihad Airways</option>
            <option value="Air India">Air India</option>
            <option value="Other">Other</option>
          </select>
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
  from_location: string;
  to_location: string;
  airline: string;
  flight_date: string;
}

interface CompanionSignup {
  id: string;
  from_location: string;
  to_location: string;
  airline: string;
  flight_date: string;
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {request.from_location} → {request.to_location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Plane className="h-4 w-4 mr-1" />
                      {request.airline}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(request.flight_date)}
                    </div>
                  </div>
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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-gray-900">
                      {signup.from_location} → {signup.to_location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Plane className="h-4 w-4 mr-1" />
                      {signup.airline}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(signup.flight_date)}
                    </div>
                  </div>
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
