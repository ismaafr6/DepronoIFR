import { NextResponse } from 'next/server';

const MOCK_LOGS = [
  { time: new Date().toISOString().replace('T', ' ').slice(0, 16), ip: "127.0.0.1", status: "SUCCESS" },
  { time: new Date(Date.now() - 3600000).toISOString().replace('T', ' ').slice(0, 16), ip: "192.168.1.45", status: "FAILED" }
];

export async function GET(request: Request) {
  return NextResponse.json(MOCK_LOGS);
}
