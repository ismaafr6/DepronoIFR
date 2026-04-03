import requests
import os
from dotenv import load_dotenv

load_dotenv()

class DataEngine:
    def __init__(self):
        self.api_key = os.getenv("RAPIDAPI_KEY")
        self.host = "api-football-v1.p.rapidapi.com"
        self.headers = {
            "X-RapidAPI-Key": self.api_key,
            "X-RapidAPI-Host": self.host
        }
        self.base_url = f"https://{self.host}/v3"

    def get_lineups(self, fixture_id: int):
        url = f"{self.base_url}/fixtures/lineups"
        params = {"fixture": fixture_id}
        response = requests.get(url, headers=self.headers, params=params)
        return response.json()

    def get_live_stats(self, fixture_id: int):
        url = f"{self.base_url}/fixtures/statistics"
        params = {"fixture": fixture_id}
        response = requests.get(url, headers=self.headers, params=params)
        return response.json()

    def get_events(self, fixture_id: int):
        url = f"{self.base_url}/fixtures/events"
        params = {"fixture": fixture_id}
        response = requests.get(url, headers=self.headers, params=params)
        return response.json()

    def calculate_momentum(self, stats):
        # Lógica innovadora: Calculamos el "impulso" basado en ataques peligrosos, tiros y posesión reciente
        # Simplificado para el MVP:
        home_score = 0
        away_score = 0
        
        for team_stats in stats.get('response', []):
            team_name = team_stats['team']['name']
            s_dict = {s['type']: s['value'] for s in team_stats['statistics']}
            
            # Ponderación de momentum
            score = (
                (s_dict.get('Shots on Goal', 0) or 0) * 3 +
                (s_dict.get('Corner Kicks', 0) or 0) * 1.5 +
                (float(s_dict.get('Ball Possession', '0%').strip('%')) / 10)
            )
            
            if team_name == stats['response'][0]['team']['name']:
                home_score = score
            else:
                away_score = score
                
        total = home_score + away_score
        if total == 0: return 50
        return round((home_score / total) * 100)

if __name__ == "__main__":
    # Test local
    # engine = DataEngine()
    # print(engine.get_lineups(fixture_id=12345))
    pass
