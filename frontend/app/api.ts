const API_URL = "http://localhost:8000";

export async function getPrediction(fixtureId: number) {
  try {
    const response = await fetch(`${API_URL}/prediction/${fixtureId}`);
    if (!response.ok) throw new Error("API Error");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // Return mock fallback
    return {
      fixture_id: fixtureId,
      home_win_prob: 0.54,
      draw_prob: 0.21,
      away_win_prob: 0.25,
      momentum: 72,
      tactical_insight: "Villarreal está asediando el área rival. La posesión ha subido al 78% en los últimos 5 minutos."
    };
  }
}
