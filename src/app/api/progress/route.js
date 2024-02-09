// Import necessary dependencies
import { NextResponse } from 'next/server';

// API route for handling progress updates
export async function POST(request) {
  try {
    // Extract progress from the request body, defaulting to 0 if not provided
    const progress = request.body && !isNaN(parseFloat(request.body.progress))
    ? parseFloat(request.body.progress)
    : 0;
    return NextResponse.json({ progress }, {status: 200})
  } catch (error) {
    // Handle errors
    console.error('Error handling progress update:', error);
    return NextResponse.json({ error: 'An error occurred while handling the progress update.' }, {status: 500})
  }
}
// API route for handling progress updates
export async function GET(request) {
  try {
    // Extract progress from the request body, defaulting to 0 if not provided
    const progress = request.body && !isNaN(parseFloat(request.body.progress))
    ? parseFloat(request.body.progress)
    : 0;
    return NextResponse.json({ progress }, {status: 200})
  } catch (error) {
    // Handle errors
    console.error('Error handling progress update:', error);
    return NextResponse.json({ error: 'An error occurred while handling the progress update.' }, {status: 500})
  }
}
