    // Bootstrap Scripts
    // Function to load the list of insured individuals from the server
    function loadInsuredList() {
        // Fetches data from the server
        fetch('http://localhost:8080/api/insured')
        .then(response => response.json()) // Parses the response as JSON
        .then(data => {
            // Accesses the table body element where the list will be displayed
            const tableBody = document.getElementById('insuredList');
            // Iterates over each insured individual in the fetched data
            data.forEach(insured => {
                // Creates a table row for each insured individual
                const tr = document.createElement('tr');
                // Sets the inner HTML of the row with insured individual's data
                tr.innerHTML = `
                    <td>${insured.id}</td>
                    <td>${insured.firstName}</td>
                    <td>${insured.lastName}</td>
                    <td>${insured.email}</td>
                    <td>${insured.phone}</td>
                    <td>${insured.residence}</td>
                    <td>${new Date(insured.dateOfBirth).toLocaleDateString()}</td>
                    <td>${insured.socialSecurityNumber}</td>
                    <td>${insured.placeOfBirth}</td>
                    <td>${insured.maritalStatus}</td>
                    <td>
                        <button onclick="goToInsuredDetail(${insured.id})">View Details</button>
                    </td>
                `;
                // Appends the created row to the table body
                tableBody.appendChild(tr);
            });
        })
        .catch((error) => console.error('Error:', error)); // Error handling
    }

    // Function to navigate to the insured individual's detail page
    function goToInsuredDetail(insuredId) {
        // Redirects the browser to the insured detail page with the insured ID in the query string
        window.location.href = `insured_detail.html?insuredId=${insuredId}`;
    }

    // Calls the loadInsuredList function when the window is loaded
    window.onload = loadInsuredList;

    // jQuery and Bootstrap JS for additional functionality
src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"