import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup

# Configura le opzioni di Chrome
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--headless")  # Esegui il browser in modalità headless
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

# Avvia il WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

# URL della pagina
url = "https://www.orizzontescuola.it/"

# Carica la pagina
driver.get(url)

# Aspetta qualche secondo per il caricamento completo
time.sleep(5)

# Ottieni il codice HTML della pagina
html_content = driver.page_source

print(html_content)

# Chiudi il browser
driver.quit()

# Analizza il contenuto HTML con BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Trova tutti gli articoli
articles = soup.find_all("article")

# Lista per il file JSON
articles_data = []

# Crea o apre il file "pagina.txt" in modalità scrittura
with open("pagina.txt", "w", encoding="utf-8") as file:
    for article in articles:
        # Trova la categoria
        category_tag = article.find("span", class_="category")
        
        # Trova il titolo e il link
        title_tag = article.find("h2", class_="entry-title")
        
        # Trova la data e l'orario
        date_tag = article.find("time", class_="entry-date")
        
        if category_tag and title_tag and date_tag:
            category = category_tag.get_text(strip=True)
            
            # Verifica se c'è un anchor tag nel titolo
            anchor_tag = title_tag.find("a")
            if anchor_tag:
                title = anchor_tag.get_text(strip=True)
                link = anchor_tag["href"]
            else:
                title = "N/A (Anchor tag non trovato)"
                link = "N/A"

            # Estrai la data e l'orario
            datetime_str = date_tag.get_text(strip=True)
            date, time = datetime_str.split(" - ", 1)  # Separiamo la data dall'orario
            
            # Scrivi i dati nel file di testo
            file.write(f"Categoria: {category}\n")
            file.write(f"Titolo: {title}\n")
            file.write(f"Link: {link}\n")
            file.write(f"Data: {date}\n")
            file.write(f"Orario: {time}\n")
            file.write("-" * 80 + "\n")
            
            # Aggiungi i dati all'elenco per il JSON
            articles_data.append({
                "category": category,
                "title": title,
                "link": link,
                "date": date,
                "time": time
            })

# Salva i dati nel file JSON
with open("data.json", "w", encoding="utf-8") as json_file:
    json.dump(articles_data, json_file, indent=4, ensure_ascii=False)

print("I dati sono stati salvati nei file 'pagina.txt' e 'data.json'.")