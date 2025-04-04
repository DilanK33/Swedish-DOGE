from flask import Blueprint, request, jsonify
from database import get_budget_data, session

api = Blueprint('api', __name__)

@api.route('/search', methods=['GET'])
def search():
	year = request.args.get('year')
	category = request.args.get('category')

	if category and not year:
		from models import BudgetEntry, Base

		years = session.query(BudgetEntry.year).distinct().all()

		all_data = []

		for year in years:
			all_data += get_budget_data(year[0], category)

		print(all_data)

		return jsonify(all_data)

	elif year and not category:
		from models import BudgetEntry, Base

		categories = session.query(BudgetEntry.category).distinct().all()

		all_data = []

		if not int(year):
			year = 0

		for category in categories:
			all_data += get_budget_data(year, category[0])

		print(all_data)

		return jsonify(all_data)

	elif year and category:
		data = get_budget_data(year, category)
		return jsonify(data)
	else:
		return jsonify({"message": "Please provide a year or a category for the search."})

@api.route('/Home',  methods=['GET'])
def instructions():
	from models import BudgetEntry, Base
	categories = session.query(BudgetEntry.category).distinct().all()
	years = session.query(BudgetEntry.year).distinct().all()

	years_list = []
	categories_list = []

	for year in years:
		years_list.append(year[0])

	for category in categories:
		categories_list.append(category[0])
	
	total_list = []

	total_list.append(categories_list)
	total_list.append(years_list)

	return jsonify({"categories and years": total_list})
