MOCK_STATS = {
    "response": [
        {
            "team": {"id": 1, "name": "Villarreal"},
            "statistics": [
                {"type": "Shots on Goal", "value": 5},
                {"type": "Ball Possession", "value": "58%"},
                {"type": "Corner Kicks", "value": 4}
            ]
        },
        {
            "team": {"id": 2, "name": "Celta Vigo"},
            "statistics": [
                {"type": "Shots on Goal", "value": 2},
                {"type": "Ball Possession", "value": "42%"},
                {"type": "Corner Kicks", "value": 2}
            ]
        }
    ]
}

MOCK_EVENTS = [
    {"type": "Goal", "detail": "Normal Goal", "team": {"id": 1}, "player": {"name": "Gerard Moreno"}},
    {"type": "Card", "detail": "Yellow Card", "team": {"id": 2}, "player": {"name": "Iago Aspas"}}
]

MOCK_ODDS = [
    {
        "id": 1,
        "match": "Villarreal vs Celta Vigo",
        "league": "La Liga",
        "market": "Over 2.5 Goals",
        "odds": 2.10,
        "value_score": 8.5,
        "roi_projected": "24%",
        "confidence": "HIGH"
    },
    {
        "id": 2,
        "match": "Real Madrid vs Barcelona",
        "league": "La Liga",
        "market": "Home Win",
        "odds": 1.95,
        "value_score": 7.2,
        "roi_projected": "12%",
        "confidence": "MEDIUM"
    },
    {
        "id": 3,
        "match": "Man City vs Liverpool",
        "league": "Premier League",
        "market": "Both Teams to Score",
        "odds": 1.80,
        "value_score": 9.1,
        "roi_projected": "31%",
        "confidence": "ULTRA"
    }
]
