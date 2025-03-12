fetch("cleaned_2025_Jan__20250312_0649.json")
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    console.log(data); // Check what you're receiving

    const tableBody = document.querySelector('.expense-table tbody'); // Find tbody element

    // Check if data is an array
    if (Array.isArray(data)) {
      data.forEach(item => {
        const row = document.createElement('tr');  // Create a new row

        // Add cells for department and total
        row.innerHTML = `
          <td>${item['Utgiftsområdesnamn']}</td>  <!-- Access correct property name -->
          <td>${item['Total']}</td>  <!-- Access correct property name -->
        `;

        // Append the row to the tbody
        tableBody.appendChild(row);
      });
    } else {
      console.error("Data is not an array:", data);
    }
  })
  .catch(error => console.error('Error fetching data:', error));

