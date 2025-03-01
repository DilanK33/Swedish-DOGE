from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class BudgetEntry(Base):
	__tablename__ = 'budget'

	id = Column(Integer, primary_key=True)
	year = Column(Integer)
	department = Column(String) 
	grant_name = Column(String) # For what?
	grant_entry_name = Column(String) # With what purpose or for whom?
	category = Column(String) # 'Genre'/'Area of interest'/Filters/category
	org_nr = Column(String) # Way to search the organization
	total_spent = Column(Float)

	def to_dict(self):
		# Convert the object to a dictionary, including all columns
		return {
			"id": self.id,
			"year": self.year,
			"department": self.department,
			"grant_name": self.grant_name,
			"grant_entry_name": self.grant_entry_name,
			"category": self.category,
			"org_nr": self.org_nr,
			"total_spent": self.total_spent
		}

# Create engine establishes a connection to the database, in this case I'll be using sqlite
engine = create_engine("sqlite:///budget.db")
# creates the database tables if they don't already exist
Base.metadata.create_all(engine)