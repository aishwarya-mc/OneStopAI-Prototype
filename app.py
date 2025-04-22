from flask import Flask, render_template, request, jsonify
import mysql.connector

app = Flask(__name__)

# MySQL configuration
db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='xxxxxxx',  # Change this to your actual root password
    database='onestopai'  # Use your correct database name here (onestopai)
)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about_us')
def about_us():
    return render_template('aboutus.html')

@app.route('/contact_us')
def contact_us():
    return render_template('contactus.html')

@app.route('/submit_message', methods=['POST'])
def submit_message():
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    cursor = db.cursor()
    try:
        # Insert message data into 'contact' table
        cursor.execute("INSERT INTO contact (name, email, subject, message) VALUES (%s, %s, %s, %s)", 
                       (name, email, subject, message))
        db.commit()
        return 'Message sent successfully!', 200
    except Exception as e:
        db.rollback()  # Rollback in case of error
        return str(e), 500
    finally:
        cursor.close()

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/category')
def category():
    return render_template('category.html')

@app.route('/fetch_aitools')
def fetch_aitools():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tools")  # Ensure the 'tools' table exists
    aitools = cursor.fetchall()
    cursor.close()
    return jsonify(aitools)

# Login endpoint to save user credentials
@app.route('/submit_login', methods=['POST'])
def submit_login():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    date = data.get('date')

    cursor = db.cursor()
    try:
        # Insert login credentials into 'credentials' table
        cursor.execute("INSERT INTO credentials (username, email, password, date) VALUES (%s, %s, %s, %s)", 
                       (username, email, password, date))
        db.commit()
        return 'Login details saved successfully!', 200
    except Exception as e:
        db.rollback()  # Rollback in case of error
        return str(e), 500
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)
