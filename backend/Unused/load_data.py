import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import BudgetEntry, Base

from pathlib import Path

# Load CSV
base = Path(r"C:\Users\dilan\OneDrive\Dokument\GitHub\Sweden-DOGE-Renewed\Sweden-s-AI-DOGE-main\Sweden-s-AI-DOGE-main\DOGE-DEMO-v.0\backend")
file_path = base / "data" / "cleaned_2025_Jan__20250312_0649.json"
df = pd.read_json(file_path, encoding='utf-8')

# Create database engine
engine = create_engine("sqlite:///budget.db")

# Create tables if they don't exist
Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)


# Create a session
Session = sessionmaker(bind=engine)
session = Session()

# Insert data
for _, row in df.iterrows():
    entry = BudgetEntry(
		year=int(row["År"]),
        category=row["Utgiftsområdesnamn"],
        grant_date=row["Anslag"],
        grant_name=row["Anslagsnamn"],
        grant_entry_name=row["Anslagspostsnamn"],
        department=row["Myndighet"],
        org_nr=row["Organisationsnummer"],
        category_date=row["Utgiftsområde utfallsår"],
        category_area_real=row["Utgiftsområdesnamn utfallsår"],
        grant_name_real=row["Anslagsnamn utfallsår"],
        grant_entry_name_real=row["Anslagspostsnamn utfallsår"],
        total_spent=float(row["Total"])
    )
    session.add(entry)

# Commit to save changes
session.commit()
session.close()

print("✅ Data successfully inserted into budget.db!")