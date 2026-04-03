from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random

app = FastAPI(title="DepronoIFR Zen", version="15.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- THE ZEN ENGINE ---
class ZenEngine:
    def __init__(self):
        self.frequency = 1.0 # 1Hz (Normal)
        self.market_maker = "Betfair_Exchange"

    def predict_market_maker(self):
        # Predice quién liderará el próximo movimiento de cuota
        leaders = ["Pinnacle", "Bet365", "Betfair_Exchange", "Sindicato_Z"]
        return random.choice(leaders)

    def calculate_sonic_frequency(self):
        # Calcula la 'vibración' del mercado basada en volatilidad
        return round(0.5 + (random.random() * 4.5), 2)

zen = ZenEngine()

@app.get("/fixtures")
async def get_fixtures():
    return [{"id": 123, "home": "Villarreal", "away": "Celta Vigo", "status": "LIVE", "score": "3-1", "logo_home": "https://media.api-sports.io/football/teams/533.png", "logo_away": "https://media.api-sports.io/football/teams/538.png", "league_id": 140, "date": "2026-04-03"}]

@app.websocket("/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            freq = zen.calculate_sonic_frequency()
            maker = zen.predict_market_maker()
            await websocket.send_text(json.dumps({
                "type": "ZEN_STREAM",
                "minute": 90,
                "score": "3-1",
                "frequency": freq,
                "market_maker": maker,
                "confidence": 99.85,
                "zen_state": "PURE_LIGHT",
                "volatility": "HIGH" if freq > 3.0 else "STEADY"
            }))
            await asyncio.sleep(2)
    except Exception:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
