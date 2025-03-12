fetch("cleaned_2025_Jan__20250312_2034.json")
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    console.log(data); // Check what you're receiving

    const tableBody = document.querySelector('.expense-table tbody'); // Find tbody element
	let i = 0
    // Check if data is an array
    if (Array.isArray(data) & i <= 15) {
      data.forEach(item => {
		if (i < 25) {
			const row = document.createElement('tr');  // Create a new row

			let num = item['Total']*1000000
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
  })
  .catch(error => console.error('Error fetching data:', error));

