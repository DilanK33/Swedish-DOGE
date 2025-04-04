urls = [
	"data_sheets/cleaned_2025_jan_earnings.json",
	"data_sheets/cleaned_2025_jan_spending.json",
	"data_sheets/cleaned_2024_jan_spending.json",
	"data_sheets/cleaned_2024_jan_earnings.json",
	"data_sheets/cleaned_2023_jan_spending.json",
	"data_sheets/cleaned_2023_jan_earnings.json",
	"data_sheets/cleaned_2022_jan_spending.json",
	"data_sheets/cleaned_2022_jan_earnings.json",
]

/* Dropdown menu listener */
document.querySelectorAll('#year-dropdown a').forEach(item => {
	item.addEventListener('click', function(event) {
		event.preventDefault(); // Stop default link behaviour
		const year = this.innerText;
		console.log("Selected year: ", year);
		let lst_files = []

		lst_files = find_file(year);
		console.log("Selected earnings file: ", lst_files[0]);
		console.log("Selected spending file: ",  lst_files[1]);

		populateTables( lst_files[0],  lst_files[1]);
	})
})







/* Functions */

function find_file(year) {
	for (let i = 0; i < urls.length; i++) {
		if (urls[i].includes(year) && urls[i].includes("earnings")) {
			console.log("Selected YUUURR: ", urls[i]);
			file_name_earnings = urls[i];
		} else if (urls[i].includes(year) && urls[i].includes("spending")) {
			file_name_spendings = urls[i];
		} else if (urls[i].includes(year) && urls[i].includes("earnings")) {
			console.log("BOOOP");
		}
	}

	let lst = [file_name_earnings, file_name_spendings];

	return lst
}

function populateTables(file_name_earnings, file_name_spendings) {
	earnings(file_name_earnings);
	spendings(file_name_spendings);
}

function earnings(file_name_earnings) {
	// Earnings
	fetch(file_name_earnings)
	.then(response => response.json())  // Convert the response to JSON
	.then(data => {
		console.log(data); // Check what you're receiving

		const tableBody = document.querySelector('.earnings-table tbody'); // Find tbody element
		tableBody.innerHTML = ''
		let j = 0
		let total_earnings = 0
		let totality = 0
		// Check if data is an array
		if (Array.isArray(data)) {
		data.forEach(item => {
			if (j < 25) {
				const row = document.createElement('tr');  // Create a new row

				let num = item['Total']*1000000
				total_earnings += num
				let formatted_number = num.toLocaleString('sv-SE')
				// Add cells for department and total
				row.innerHTML = `
				<td class="data-cell">${item['Myndighet']}</td>  <!-- Access correct property name -->
				<td class="data-cell">${formatted_number} kr</td>  <!-- Access correct property name for chosen year -->
				`;

				// Append the row to the tbody
				tableBody.appendChild(row);
				j += 1
			}
			});
		} else {
		console.error("Data is not an array:", data);
		}
		data.forEach(item => {
			totality += item['Total']*1000000;
		});
		const totalRow = document.createElement('tr'); // Create the total row
		let total_earnings_formatted = totality.toLocaleString('sv-SE')
		totalRow.innerHTML = `
			<td class="data-cell"><strong>Totalt tjänat<strong></td>  <!-- Access correct property name -->
			<td class="data-cell"><strong>${total_earnings_formatted} kr<strong></td>  <!-- Access correct property name -->
			`;
			tableBody.appendChild(totalRow);
	})
	.catch(error => console.error('Error fetching data:', error));
}

function spendings(file_name_spendings) {
	// Spending
	fetch(file_name_spendings)
	.then(response => response.json())  // Convert the response to JSON
	.then(data => {
		console.log(data); // Check what you're receiving

		const tableBody = document.querySelector('.expense-table tbody'); // Find tbody element
		tableBody.innerHTML = ''
		let i = 0
		let total_spent = 0
		let totality = 0
		// Check if data is an array
		if (Array.isArray(data)) {
		data.forEach(item => {
			if (i < 25) {
				const row = document.createElement('tr');  // Create a new row

				let num = item['Total']*1000000
				total_spent += num
				let formatted_number = num.toLocaleString()
				// Add cells for department and total
				row.innerHTML = `
				<td class="data-cell">${item['Myndighet']}</td>  <!-- Access correct property name -->
				<td class="data-cell">${formatted_number} kr</td>  <!-- Access correct property name for chosen year -->
				`;

				// Append the row to the tbody
				tableBody.appendChild(row);
				i += 1
			}
			});
		} else {
		console.error("Data is not an array:", data);
		}
		data.forEach(item => {
			totality += item['Total']*1000000;
		});
		const totalRow = document.createElement('tr'); // Create the total row
		let total_spent_formatted = totality.toLocaleString('sv-SE')
		totalRow.innerHTML = `
			<td class="data-cell"><strong>Totalt spenderat<strong></td>  <!-- Access correct property name -->
			<td class="data-cell"><strong>${total_spent_formatted} kr<strong></td>  <!-- Access correct property name -->
			`;
			tableBody.appendChild(totalRow);
	})
	.catch(error => console.error('Error fetching data:', error));
}

// function showSidebar() {

// }
