# app.py
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
db = SQLAlchemy(app)

# Coach model
class Coach(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    specialization = db.Column(db.String(100))
    experience_years = db.Column(db.Integer)
    profile_image = db.Column(db.String(100))
    bio = db.Column(db.Text)
    instagram = db.Column(db.String(100))
    youtube = db.Column(db.String(100))
    available = db.Column(db.Boolean, default=True)

@app.route('/')
def home():
    return render_template('login.html')
@app.route('/signup.html')
def signup():
    return render_template('signup.html')
@app.route('/home.html')
def index():
    return render_template('home.html')

@app.route('/coaches')
def all_coaches():
    coaches = Coach.query.all()
    return render_template('coaches.html', coaches=coaches)

@app.route('/admin')
def admin_panel():
    coaches = Coach.query.all()
    return render_template('admin.html', coaches=coaches)

@app.route('/add_coach', methods=['GET', 'POST'])
def add_coach():
    if request.method == 'POST':
        image = request.files['profile_image']
        filename = secure_filename(image.filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        coach = Coach(
            name=request.form['name'],
            specialization=request.form['specialization'],
            experience_years=int(request.form['experience_years']),
            profile_image=filename,
            bio=request.form['bio'],
            instagram=request.form['instagram'],
            youtube=request.form['youtube'],
            available=('available' in request.form)
        )
        db.session.add(coach)
        db.session.commit()
        return redirect(url_for('admin_panel'))

    return render_template('add_coach.html')

@app.route("/admin/delete/<int:coach_id>", methods=["POST"])
def delete_coach(coach_id):
    coach = Coach.query.get_or_404(coach_id)

    # Delete the profile image from the static folder
    if coach.profile_image:
        try:
            os.remove(os.path.join("static/uploads", coach.profile_image))
        except Exception as e:
            print(f"Error deleting image: {e}")

    db.session.delete(coach)
    db.session.commit()
    return redirect(url_for("admin_panel"))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
