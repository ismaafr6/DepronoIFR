from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Header, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import json
import random
import os
import base64
from dotenv import load_dotenv

load_dotenv()
SOVEREIGN_KEY = os.getenv("SOVEREIGN_KEY", "ZEN_MASTER_2026")
SEED_PHRASE = "omega alpha zenith prime" # Simplificado para demo

app = FastAPI(title="DepronoIFR Bastión", version="16.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- BASTIÓN DEFENDER ---
class BastionDefender:
    def __init__(self):
        self.failed_attempts = 0
        self.is_locked = False
        self.logs = []

    def log_access(self, ip, success):
        status = "SUCCESS" if success else "FAILED"
        self.logs.append({"time": "2026-04-03 23:33", "ip": ip, "status": status})
        if not success:
            self.failed_attempts += 1
            if self.failed_attempts >= 3:
                self.is_locked = True

    def encrypt_payload(self, data):
        # Simulación de encriptación cuántica (Base64 Scrambling)
        json_str = json.dumps(data)
        encoded = base64.b64encode(json_str.encode()).decode()
        return {"quantum_payload": encoded, "encrypted": True}

bastion = BastionDefender()

# --- SECURITY LAYERS ---
async def verify_bastion(x_sovereign_key: str = Header(...), x_seed_phrase: str = Header(None)):
    if bastion.is_locked:
        raise HTTPException(status_code=423, detail="BASTIÓN_LOCKED_LIMIT_EXCEEDED")
    
    if x_sovereign_key != SOVEREIGN_KEY or (x_seed_phrase and x_seed_phrase != SEED_PHRASE):
        bastion.log_access("127.0.0.1", False)
        raise HTTPException(status_code=403, detail="BASTIÓN_ACCESS_DENIED")
    
    bastion.log_access("127.0.0.1", True)
    return True

@app.get("/fixtures", dependencies=[Depends(verify_bastion)])
async def get_fixtures():
    data = [{"id": 123, "home": "Villarreal", "away": "Celta Vigo", "status": "LIVE", "score": "5-1"}]
    return bastion.encrypt_payload(data)

@app.get("/bastion/logs", dependencies=[Depends(verify_bastion)])
async def get_logs():
    return bastion.logs

@app.websocket("/live")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            raw_data = {
                "minute": 90,
                "score": "5-1",
                "frequency": round(random.random(), 2),
                "confidence": 99.98,
                "bastion_shield": "ACTIVE",
                "interference": "0%"
            }
            # WS también fluye encriptado en el Bastión
            await websocket.send_text(json.dumps(bastion.encrypt_payload(raw_data)))
            await asyncio.sleep(2)
    except Exception:
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
