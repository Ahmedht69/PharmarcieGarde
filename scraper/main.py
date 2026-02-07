import requests
from bs4 import BeautifulSoup
import json
import re
import time

BASE_URL = "https://www.annuaire-gratuit.ma/pharmacie-garde-fes.html"
OUTPUT_FILE = "pharmacie-garde/public/data/pharmacies.json"

def get_pharmacy_details(url):
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        name_tag = soup.find('h1')
        name = name_tag.get_text(strip=True) if name_tag else "N/A"
        
        phone_tag = soup.find('a', href=re.compile(r'^tel:'))
        phone = phone_tag.get_text(strip=True) if phone_tag else "N/A"
        
        map_link = soup.find('a', href=re.compile(r'maps\.google\.com'))
        lat, lon = None, None
        if map_link:
            href = map_link['href']
            match = re.search(r'q=([-0-9.]+),([-0-9.]+)', href)
            if match:
                lat = float(match.group(1))
                lon = float(match.group(2))
        
        quartier = "Fes"
        quartier_match = soup.find(string=re.compile("Quartier :"))
        if quartier_match:
             pass

        return {
            "name": name,
            "phone": phone,
            "lat": lat,
            "lon": lon
        }
    except Exception as e:
        print(f"Error fetching details for {url}: {e}")
        return None

def main():
    print("Fetching main list...")
    response = requests.get(BASE_URL, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.content, 'html.parser')
    
    pharmacies = []
    
    pharmacies = []
    
    links = soup.find_all('a', href=re.compile(r'pharmacie-.*-s\d+\.html'))
    
    unique_urls = set()
    
    for link in links:
        url = link['href']
        if not url.startswith('http'):
            url = "https://www.annuaire-gratuit.ma" + url
            
        if url in unique_urls:
            continue
        unique_urls.add(url)
        
        full_text = link.get_text("\n", strip=True)
        parts = full_text.split("\n")
        
        address = " ".join(parts[1:]).strip() if len(parts) > 1 else "Adresse non spécifiée"
        
        print(f"Processing {url}...")
        details = get_pharmacy_details(url)
        
        if details:
            pharmacies.append({
                "url": url,
                "address": address,
                **details
            })
        
        time.sleep(1)
        
    import os
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    print(f"Found {len(pharmacies)} pharmacies.")
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(pharmacies, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
