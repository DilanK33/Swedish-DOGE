from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class BudgetEntry(Base):
	__tablename__ = 'budget'

	id = Column(Integer, primary_key=True)
	year = Column(Integer)
	category = Column(String) # 'Genre'/'Area of interest'/Filters/category
	grant_date = Column(String)  # This will map to 'Anslag'
	grant_name = Column(String)  # This will map to 'Anslagsnamn'
	grant_entry_name = Column(String)  # This will map to 'Anslagspostsnamn'
	department = Column(String)  # This will map to 'Myndighet'
	org_nr = Column(String)  # This will map to 'Organisationsnummer'
	category_date = Column(String)  # This will map to 'Utgiftsområde utfallsår'
	category_area_real = Column(String)  # This will map to 'Utgiftsområdesnamn utfallsår'
	grant_name_real = Column(String)  # This will map to 'Anslagsnamn utfallsår'
	grant_entry_name_real = Column(String)  # This will map to 'Anslagspostsnamn utfallsår'
	total_spent = Column(Float)

	def to_dict(self):
		# Convert the object to a dictionary, including all columns
		return {
			"id": self.id,
			"year": self.year,
			"category": self.category,
			"grant_date": self.grant_date,
			"grant_name": self.grant_name,
			"grant_entry_name": self.grant_entry_name,
			"department": self.department,
			"org_nr": self.org_nr,
			"category_date": self.category_date,
			"category_area_real": self.category_area_real,
			"grant_name_real": self.grant_name_real,
			"grant_entry_name_real": self.grant_entry_name_real,
			"total_spent": self.total_spent
		}
# Create engine establishes a connection to the database, in this case I'll be using sqlite
engine = create_engine("sqlite:///budget.db")
# creates the database tables if they don't already exist
Base.metadata.create_all(engine)