    // Function to load policies from the server
    function loadPolicies() {
        // Fetches policy data from a specified URL
        fetch('http://localhost:8080/api/policies')
        .then(response => response.json()) // Parses the response as JSON
        .then(policies => {
            // Accesses the table element where the policies will be listed
            const policiesList = document.getElementById('policiesList');
            // Iterates over each policy in the fetched data
            policies.forEach(policy => {
                // Creates a new table row for each policy
                const tr = document.createElement('tr');
                // Sets the inner HTML of the row with policy data
                tr.innerHTML = `
                    <td>${policy.id}</td>
                    <td>${policy.coverageAmount}</td>
                    <td>${policy.monthlyAmount}</td>
                    <td>${new Date(policy.policyStartDate).toLocaleDateString()}</td>
                    <td>${new Date(policy.policyEndDate).toLocaleDateString()}</td>
                    <td>${policy.policyType}</td>
                    <td>${policy.insured.firstName} ${policy.insured.lastName}</td>
                    <!-- Additional cells can be added as needed -->
                    <td>
                    <button onclick="goToPolicyDetail(${policy.id})" class="btn btn-primary">View Details</button>
                    </td>
                `;
                // Appends the created row to the table
                policiesList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error)); // Error handling
    }

    // Function to navigate to the detail page of a specific policy
    function goToPolicyDetail(policyId) {
        // Redirects to a policy detail page with the policy ID in the query string
        window.location.href = `policy_detail.html?policyId=${policyId}`; // URL can be different
    }

    // Calls the loadPolicies function when the window loads
    window.onload = loadPolicies;

// Bootstrap a jQuery skripty
src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"