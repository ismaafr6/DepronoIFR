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
