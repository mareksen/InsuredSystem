
    // JavaScript function to handle the submission of the policy form
    function submitPolicyForm() {
    // Fetching date values from the form
    var startDate = new Date(document.getElementById('policyStartDate').value);
    var endDate = new Date(document.getElementById('policyEndDate').value);

    // Formatting dates to YYYY-MM-DD
    var formattedStartDate = startDate.toISOString().split('T')[0];
    var formattedEndDate = endDate.toISOString().split('T')[0];

    // Creating a formData object with the formatted dates and other form values
    var formData = {
        insured_id: parseInt(document.getElementById('insuredId').value),
        coverage_amount: parseFloat(document.getElementById('coverageAmount').value),
        monthly_amount: parseFloat(document.getElementById('monthlyAmount').value),
        policy_start_date: formattedStartDate,
        policy_end_date: formattedEndDate,
        policy_type: document.getElementById('policyType').value,
    };

    // Logging formData to the console
    console.log(formData);

    // Sending a POST request to the server with the form data
    fetch('http://localhost:8080/api/policies/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Server returned ' + response.status + ' : ' + response.statusText);
        }
    })
    .then(data => {
        console.log('Success:', data);
        // Here you can reset your form or handle the success case
    })
    .catch((error) => {
        console.error('Error:', error);
        // Here you can handle the error case
    });
}

// Function to load the insured's ID from the URL query parameters
function loadInsuredIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const insuredId = urlParams.get('insuredId');
    document.getElementById('insuredId').value = insuredId;
}

// Adding event listeners for window load and form submission
window.onload = function() {
    loadInsuredIdFromUrl(); // Loads the insured's ID when the window is loaded
    document.getElementById('form-id').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents the default form submission
        submitPolicyForm(); // Calls the function to submit the form
    });
};


// jQuery, Popper.js, and Bootstrap's JavaScript for additional functionality
src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"