import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Simula el mensaje que enviaba el WebSocket
  const liveData = {
    score: "2-1",
    bastion_shield: "ACTIVE",
    minute: Math.floor(Math.random() * 90) + 1,
    events: ["GOAL", "CARD"]
  };
  
  return NextResponse.json(liveData);
}
