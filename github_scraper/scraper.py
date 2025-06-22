import requests
from bs4 import BeautifulSoup
import csv

def scrape_github_trending():
    """
    Scrapes the top 5 trending repositories from GitHub.
    """
    url = "https://github.com/trending"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    repos = soup.find_all("article", class_="Box-row")
    
    trending_repos = []
    for repo in repos[:5]:
        h2_element = repo.find("h2", class_="h3")
        if h2_element:
            repo_name_element = h2_element.find("a")
            if repo_name_element:
                repo_name = repo_name_element.text.strip().replace("\\n", "").replace(" ", "")
                repo_link = "https://github.com" + repo_name_element['href']
                trending_repos.append([repo_name, repo_link])
            
    return trending_repos

def save_to_csv(data):
    """
    Saves the scraped data to a CSV file.
    """
    if not data:
        print("No data to save.")
        return
        
    with open('trending_repos.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['repository name', 'link'])
        writer.writerows(data)
    print("Successfully saved data to trending_repos.csv")

if __name__ == "__main__":
    scraped_data = scrape_github_trending()
    save_to_csv(scraped_data) 