import { NextResponse } from 'next/server';

const MOCK_ODDS = [
  { id: 1, match: "Man City vs Liverpool", league: "Premier League", market: "BTTS", odds: 1.80, value_score: 9.1, roi_projected: "31%", confidence: "ULTRA" },
  { id: 2, match: "Villarreal vs Celta", league: "La Liga", market: "Over 2.5", odds: 2.10, value_score: 8.5, roi_projected: "24%", confidence: "HIGH" }
];

export async function GET(request: Request) {
  return NextResponse.json(MOCK_ODDS);
}
