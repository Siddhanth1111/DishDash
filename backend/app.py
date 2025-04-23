from flask import Flask, jsonify, request
import requests
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # <-- This line allows all origins by default


load_dotenv()



RAZORPAY_KEY = os.getenv("RAZORPAY_KEY")
RAZORPAY_SECRET = os.getenv("RAZORPAY_SECRET")

@app.route('/create-payment-link', methods=['POST'])
def create_payment_link():
    data = request.get_json()
    print("Received data:", data)  # For debugging

    amount = int(data.get("amount"))*100 # Convert to paise
    items = data.get("items",[])
    customer_name = data.get("customer_name","Customer")
    customer_phone = data.get("customer_phone","9999999999")

    payload = {
        "amount": amount,
        "currency": "INR",
        "accept_partial": False,
        "description": f"Food Order: {', '.join(items)}",
        "customer": {
            "name": customer_name,
            "contact": customer_phone
        },
        "notify": {
            "sms": True
        },
        "callback_url": "https://yourdomain.com/success.html",
        "callback_method": "get"
    }

    try:
        response = requests.post(
            "https://api.razorpay.com/v1/payment_links",
            auth=(RAZORPAY_KEY, RAZORPAY_SECRET),
            json=payload
        )
        res_data = response.json()

        if response.status_code == 200:
            return jsonify({"payment_url": res_data["short_url"]})
        else:
            return jsonify({"error": res_data}), 400

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Failed to create payment link"}), 500

if __name__ == "__main__":
    app.run(debug=True)


