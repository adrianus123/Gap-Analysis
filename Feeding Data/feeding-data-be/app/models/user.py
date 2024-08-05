from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.company_id'), nullable=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.Text())
    email = db.Column(db.String(), unique=True, nullable=False)
    full_name = db.Column(db.String(), nullable=False)
    role = db.Column(db.String(), nullable=False)
    jobs = db.relationship('Job', back_populates='employee', lazy=True)
    company = db.relationship('Company', back_populates='employees')
    
    def __repr__(self):
        return f"<User {self.username}>"
    
    def set_password(self, password):
        self.password = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    @classmethod
    def get_user_by_username(cls, username):
        return cls.query.filter_by(username = username).first()
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        db.session.delete(self)
        db.session.commit()