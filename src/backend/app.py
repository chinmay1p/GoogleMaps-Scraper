from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def scrape_mouthshut_reviews(company_slug):
    url = f"https://www.mouthshut.com/product-reviews/{company_slug}-reviews-925925970"
    headers = {"User-Agent": "Mozilla/5.0"}

    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        return []

    soup = BeautifulSoup(response.content, "html.parser")
    reviews = []

    for block in soup.select(".review-article")[:5]:
        title = block.select_one(".review-title")
        content = block.select_one(".more")
        stars = len(block.select(".rating .msprite-star.full"))

        reviews.append({
            "title": title.text.strip() if title else "No Title",
            "text": content.text.strip() if content else "No Content",
            "rating": stars
        })

    return reviews

@app.route("/api/reviews", methods=["POST"])
def get_reviews():
    data = request.get_json()
    company = data.get("company", "").strip()

    if not company:
        return jsonify({"error": "No company provided"}), 400

    slug = company.replace(" ", "-")
    reviews = scrape_mouthshut_reviews(slug)

    if not reviews:
        return jsonify({"error": "No reviews found."}), 404

    print("Fetched", len(reviews), "reviews")

    return jsonify(reviews)

if __name__ == "__main__":
    app.run(debug=True)
