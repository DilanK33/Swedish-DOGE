fetch("cleaned_2025_Jan__20250313_1144.json")
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    console.log(data); // Check what you're receiving

    const tableBody = document.querySelector('.expense-table tbody'); // Find tbody element
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
			<td>${item['Myndighet']}</td>  <!-- Access correct property name -->
			<td>${formatted_number +' kr'}</td>  <!-- Access correct property name -->
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
		<td><strong>Totalt spenderat<strong></td>  <!-- Access correct property name -->
		<td><strong>${total_spent_formatted} kr<strong></td>  <!-- Access correct property name -->
		`;
		tableBody.appendChild(totalRow);
  })
  .catch(error => console.error('Error fetching data:', error));


fetch("cleaned_2025_jan_earnings__20250313_1244.json")
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    console.log(data); // Check what you're receiving

    const tableBody = document.querySelector('.earnings-table tbody'); // Find tbody element
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
			<td>${item['Myndighet']}</td>  <!-- Access correct property name -->
			<td>${formatted_number +' kr'}</td>  <!-- Access correct property name -->
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
		<td><strong>Totalt tjänat<strong></td>  <!-- Access correct property name -->
		<td><strong>${total_earnings_formatted} kr<strong></td>  <!-- Access correct property name -->
		`;
		tableBody.appendChild(totalRow);
  })
  .catch(error => console.error('Error fetching data:', error));
