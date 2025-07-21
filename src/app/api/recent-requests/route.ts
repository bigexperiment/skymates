import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'passenger') {
      // Fetch recent passenger requests (only flight details, no personal info)
      const { data, error } = await supabase
        .from('passenger_requests')
        .select('id, from_location, to_location, airline, flight_date, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch passenger requests' },
          { status: 500 }
        );
      }

      return NextResponse.json({ data });

    } else if (type === 'companion') {
      // Fetch recent companion signups (only flight details, no personal info)
      const { data, error } = await supabase
        .from('companion_signups')
        .select('id, from_location, to_location, airline, flight_date, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json(
          { error: 'Failed to fetch companion signups' },
          { status: 500 }
        );
      }

      return NextResponse.json({ data });

    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter. Use "passenger" or "companion"' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 