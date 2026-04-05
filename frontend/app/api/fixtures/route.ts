import { NextResponse } from 'next/server';

// Datos Mock (Replican mock_data.py)
const MOCK_FIXTURES = [
  { id: 101, home: "Villarreal", away: "Celta Vigo", status: "LIVE", score: "2-1", logo_home: "https://media.api-sports.io/football/teams/533.png", logo_away: "https://media.api-sports.io/football/teams/538.png" },
  { id: 102, home: "Real Madrid", away: "Barcelona", status: "PRE", score: "0-0", logo_home: "https://media.api-sports.io/football/teams/541.png", logo_away: "https://media.api-sports.io/football/teams/529.png" }
];

export async function GET(request: Request) {
  // En una versión real, aquí validaríamos el Header de Bastión (Encryption)
  // Por simplicidad para el despliegue rápido, devolvemos los datos
  return NextResponse.json(MOCK_FIXTURES);
}
