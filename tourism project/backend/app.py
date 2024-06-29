from flask import Flask ,request,jsonify 
import json
import pymysql
from flask_cors import CORS

app=Flask(__name__)
CORS(app)  # Initialize CORS with your Flask app


cors = CORS(app, resources={
    r"/api/*": {"origins": "https://yourdomain.com"},
    r"/public/api/*": {"origins": "*"}
})

def db_connection():
    conn= None
    try:
        conn = pymysql.connect(
            host='localhost',#127.0.0.1
            database='tourism_db',
            user='root',
            password='rebelhemu333',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
    except pymysql.error as e:
        print(e)
    return conn


@app.route('/register', methods=['POST'])
def registration():
    conn = db_connection()
    cursor = conn.cursor()

    # Get user details from the POST request
    data = request.json  # Assuming the request data is in JSON format

    username = data.get('username')
    age = int(data.get('age'))  # Convert age to an integer
    gender = data.get('gender')
    email = data.get('email')
    contact = int(data.get('contact'))  # Convert contact to an integer
    password = data.get('password')

    # Insert user details into the database
    try:
        query = "INSERT INTO registration_details (username, age, gender, email, contact, pswd) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (username, age, gender, email, contact, password))
        conn.commit()
        response = jsonify({"message": "User registered successfully"})
        response.status_code = 201  # HTTP status code for "Created"
        return response
    except Exception as e:
        conn.rollback()
        return jsonify({"message": "User registration failed", "error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()


@app.route('/login', methods=['POST'])
def login():
    conn = db_connection()
    cursor = conn.cursor()

    # Get user credentials from the POST request
    data = request.json  # Assuming the request data is in JSON format

    username = data.get('username')
    password = data.get('password')

    # Verify user credentials against the database
    try:
        query = "SELECT * FROM registration_details WHERE username = %s AND pswd = %s"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()

        if user:
            #  # Store the user's session information (e.g., user_id)
            # session['user_id'] = user['username']
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Login failed. Invalid username or password"}), 401  # Unauthorized
    except Exception as e:
        return jsonify({"message": "Login failed", "error": str(e)}), 500  # Internal Server Error
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
