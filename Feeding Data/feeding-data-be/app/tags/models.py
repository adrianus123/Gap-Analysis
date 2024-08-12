from app.extensions import db


class Tag(db.Model):
    __tablename__ = "tags"
    tag_id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(), nullable=False)
    slug = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f"<Tag {self.tag_name}>"
