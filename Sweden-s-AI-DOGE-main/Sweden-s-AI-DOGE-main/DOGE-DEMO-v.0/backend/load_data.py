import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import BudgetEntry, Base

# Load CSV
df = pd.read_csv((r"C:\Users\dilan\OneDrive\Dokument\GitHub\Sweden-s-AI-DOGE\DOGE-DEMO-v.0\backend\regering_data\output_demo_v1"), encoding='utf-8')

# Create database engine
engine = create_engine("sqlite:///budget.db")

# Create tables if they don't exist
Base.metadata.create_all(engine)

# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Insert data
for _, row in df.iterrows():
    entry = BudgetEntry(
        year=int(row["År"]),
        department=row["Myndighet"],
        grant_name=row["Anslagsnamn"],
        grant_entry_name=row["Anslagspostsnamn"],
        category=row["Utgiftsområdesnamn"],
        org_nr=row["Organisationsnummer"],
        total_spent=float(row["Total"])
    )
    session.add(entry)

# Commit to save changes
session.commit()
session.close()

print("✅ Data successfully inserted into budget.db!")