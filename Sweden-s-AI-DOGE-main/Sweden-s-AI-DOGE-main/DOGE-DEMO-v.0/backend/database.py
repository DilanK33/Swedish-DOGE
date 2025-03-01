from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import BudgetEntry, Base

# Read config. 
DATABASE_URL = "sqlite:///budget.db"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def get_budget_data(year=None, category=None):
	query = session.query(BudgetEntry)
	if year:
		query = query.filter(BudgetEntry.year == int(year))
	if category:
		query = query.filter(BudgetEntry.category.ilike(f"%{category}"))
	
	results = []
	for entry in query.all():
		results.append(entry.to_dict()) # Converts each entry to a dict
	return results