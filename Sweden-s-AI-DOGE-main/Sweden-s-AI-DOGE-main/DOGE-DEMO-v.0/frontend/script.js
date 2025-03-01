document.getElementById("search").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        show_data();
    }
});

function show_data() { // Gotta implement this to handle both button clicks and search items
    var x = document.getElementById("search").value.trim();
	if (!isNaN(x)) {  // Check if x is a number
        url = `http://localhost:5000/api/search?year=${x}`;
    } else {
        url = `http://localhost:5000/api/search?category=${x}`;
    }
    console.log("Search Input:", x);

    if (x) {
        console.log("Fetching data for:", x);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('budgetTable').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = ""; // Clear previous results

                data.forEach(item => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = item.category;
                    row.insertCell(1).textContent = item.year;
                    row.insertCell(2).textContent = item.department;
                    row.insertCell(3).textContent = item.total_spent;
                    row.insertCell(4).textContent = item.org_nr;
                    row.insertCell(5).textContent = item.grant_name;
                    row.insertCell(6).textContent = item.grant_entry_name;
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }
}

document.getElementById('migration-btn').addEventListener('click', () => show_datas('Migration'));
document.getElementById('styrelse-btn').addEventListener('click', () => show_datas('Rikets Styrelse'));
document.getElementById('rätts-btn').addEventListener('click', () => show_datas('Rättsväsendet'));
document.getElementById('intl-btn').addEventListener('click', () => show_datas('Internationell samverkan'));
document.getElementById('jämställdhet-btn').addEventListener('click', () => show_datas('Integration och jämställdhet'));
document.getElementById('utbildning-btn').addEventListener('click', () => show_datas('Utbildning och universitetsforskning'));
document.getElementById('hälsa-btn').addEventListener('click', () => show_datas('Hälsovård, sjukvård och social omsorg'));


function show_datas(category) {
	const url = `http://localhost:5000/api/search?category=${category}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('budgetTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ""; // Clear previous results

            data.forEach(item => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = item.category;
                row.insertCell(1).textContent = item.year;
                row.insertCell(2).textContent = item.department;
                row.insertCell(3).textContent = item.total_spent;
                row.insertCell(4).textContent = item.org_nr;
                row.insertCell(5).textContent = item.grant_name;
                row.insertCell(6).textContent = item.grant_entry_name;
            });
        })
        .catch(error => console.error("Error fetching data:", error));
    }
