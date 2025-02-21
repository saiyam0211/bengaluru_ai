from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://bengaluru-ai.netlify.app/","https://bengaluru-ai.netlify.app/*","http://localhost:3000", "http://localhost:5173", "https://bengaluru-ai.netlify.app"],
        "methods": ["POST"],
        "allow_headers": ["Content-Type"]
    }
})

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent"
API_KEY = "AIzaSyCmUAeWTRvHbweI7OV_nUad-NAqAlOTpvI"  

# Updated context with formatting instructions
BANGALORE_CONTEXT = """You are a specialized AI assistant focused exclusively on Bangalore, India. 
You must only answer questions in the context of Bangalore and its various aspects.

Important formatting instructions:
1. Never use asterisks (*) or bold formatting
2. Use clear hierarchical numbering (1., 1.1, 1.2, etc.) for lists
3. Use proper spacing between sections
4. Present information in a clean, easy-to-read format
5. For locations and places:
   - Include brief descriptions (1-2 lines)
   - Mention key highlights or unique features
   - Add relevant practical information when applicable
6. Group similar items together in logical categories
7. Use clear headings and subheadings

Areas of expertise:
1. History and culture
2. Places to visit and tourism
3. Local food and restaurants
4. Transportation and traffic
5. Weather and climate
6. Education institutions
7. Technology parks and companies
8. Shopping areas and markets
9. Real estate and housing
10. Local events and festivals
11. Infrastructure and development

If a question cannot be directly related to Bangalore, politely inform the user that you can only assist with Bangalore-related queries.
Maintain accuracy and provide up-to-date information about Bangalore.

User question: """

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        messages = data.get("messages", [])
        
        if not messages:
            return jsonify({"error": "Messages are required"}), 400

        user_message = messages[-1]["content"]
        contextualized_message = BANGALORE_CONTEXT + user_message

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": contextualized_message
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 1,
                "topP": 0.8,
                "maxOutputTokens": 2048,
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        }

        response = requests.post(
            f"{GEMINI_API_URL}?key={API_KEY}",
            headers={"Content-Type": "application/json"},
            json=payload
        )

        print("Gemini API Response Status:", response.status_code)
        print("Gemini API Response:", response.text)
        
        if not response.ok:
            return jsonify({
                "error": f"Gemini API error: {response.status_code} - {response.text}"
            }), 500

        response_data = response.json()
        
        if "candidates" in response_data:
            bot_reply = response_data["candidates"][0]["content"]["parts"][0]["text"]
        else:
            return jsonify({
                "error": "Unexpected response structure from Gemini API"
            }), 500

        return jsonify({
            "choices": [{
                "message": {
                    "content": bot_reply,
                    "role": "assistant"
                }
            }]
        })

    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return jsonify({"error": f"Failed to communicate with Gemini API: {str(e)}"}), 500
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse Gemini API response"}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)