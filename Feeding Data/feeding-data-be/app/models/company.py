from app.extensions import db

class Company(db.Model):
    __tablename__ = 'companies'
    company_id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(), nullable=False)
    employees = db.relationship('User', back_populates='company', lazy=True)
    
    def __repr__(self):
        return f"<Company {self.company_name}>"