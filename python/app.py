import requests
from colorthief import ColorThief
from bs4 import BeautifulSoup
from io import BytesIO
from collections import defaultdict
import json
import time
import os

def rgb_to_hex(rgb_tuple):
    return f'#{rgb_tuple[0]:02x}{rgb_tuple[1]:02x}{rgb_tuple[2]:02x}'

def scrape_bgg_website():
    print("Scraping BoardGameGeek website for game IDs...")
    response = requests.get("https://boardgamegeek.com/browse/boardgame")
    soup = BeautifulSoup(response.content, "html.parser")
    game_ids = []

    for row in soup.select("tr[id^=row_]"):
        game_id = row.select_one("td.collection_thumbnail a")["href"].split("/")[2]
        game_ids.append(game_id)

    print(f"Found {len(game_ids)} games")
    return game_ids

def fetch_games_from_bgg_api(game_ids):
    games = []
    print(f"Fetching {len(game_ids)} games from BGG API")

    ids_per_request = 20
    ids_groups = [game_ids[i:i + ids_per_request] for i in range(0, len(game_ids), ids_per_request)]

    for i, ids in enumerate(ids_groups, 1):
        print(f"Processing batch {i} of {len(ids_groups)}")
        response = requests.get(f"https://boardgamegeek.com/xmlapi2/thing?id={','.join(ids)}&stats=1")
        soup = BeautifulSoup(response.content, "lxml")
        objects = soup.find_all("item")

        for obj in objects:
            try:
                stats = obj.find("statistics").find("ratings")
                image_url = obj.find("image").text
                image_response = requests.get(image_url)
                color_thief = ColorThief(BytesIO(image_response.content))
                palette = color_thief.get_palette(color_count=4, quality=3)
                colors = [rgb_to_hex(rgb) for rgb in palette]

                item = {
                    "id": obj["id"],
                    "thumbnail": obj.find("thumbnail").text,
                    "image": image_url,
                    "name": obj.find("name", {"type": "primary"})["value"],
                    "year_published": int(obj.find("yearpublished")["value"]),
                    "rating_average": float(stats.find("bayesaverage")["value"]),
                    "rating_count": int(stats.find("usersrated")["value"]),
                    "owned_count": int(stats.find("owned")["value"]),
                    "weight_average": float(stats.find("averageweight")["value"]),
                    "categories": [rank["name"] for rank in stats.find('ranks').findAll('rank')],
                    "ranks": {rank["name"]: int(rank["value"]) for rank in stats.find("ranks").find_all("rank")},
                    "colors": colors
                }
                games.append(item)
                print(f"Processed game: {item['name']}")

            except Exception as e:
                print(f"Error processing game: {e}")
                continue

        # Add a small delay between batches to be nice to the API
        time.sleep(2)

    # Calculate category scores
    print("Calculating category scores...")
    category_counts = defaultdict(int)
    for game in games:
        for category in game["categories"]:
            category_counts[category] += 1

    for game in games:
        game["category_score"] = sum(category_counts[category] for category in game["categories"])

    return games

def save_to_file(data, filename='dataset.json'):
    output = {
        'timestamp': time.time(),
        'games': data
    }

    # Create output directory if it doesn't exist
    os.makedirs('output', exist_ok=True)

    filepath = os.path.join('output', filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Data saved to {filepath}")

def main():
    print("Starting BoardGameGeek data scraping...")

    # Scrape game IDs
    game_ids = scrape_bgg_website()

    # Fetch detailed game data
    games = fetch_games_from_bgg_api(game_ids)

    # Save to file
    save_to_file(games)

    print("Scraping completed!")
    print(f"Total games processed: {len(games)}")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"An error occurred: {e}")
