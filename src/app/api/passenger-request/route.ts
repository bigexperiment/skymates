import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      passengerName,
      from,
      to,
      airline,
      date,
      time,
      needs,
      notes
    } = body;

    // Validate required fields
    if (!name || !passengerName || !from || !to || !airline || !date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('passenger_requests')
      .insert([
        {
          name,
          email: email || null,
          phone: phone || null,
          passenger_name: passengerName,
          from_location: from,
          to_location: to,
          airline,
          flight_date: date,
          flight_time: time || null,
          notes: notes || null,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit request' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Request submitted successfully',
        data: data[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 