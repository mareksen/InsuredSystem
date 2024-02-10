  // Function to handle the submission of the insured form
  function submitInsuredForm() {
    // Gathering form data into an object
    var formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: '+420' + document.getElementById('phone').value.replace(/\s+/g, ''),
        residence: document.getElementById('residence').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        socialSecurityNumber: document.getElementById('socialSecurityNumber').value,
        placeOfBirth: document.getElementById('placeOfBirth').value,
        maritalStatus: document.getElementById('maritalStatus').value.toUpperCase() // Converts marital status to uppercase
    };
    // Logging the formData object to the console
    console.log(formData);

    // Sending a POST request to the server with the form data
    fetch('http://localhost:8080/api/insured', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            // If the response is ok, reset the form and show a success message
            document.getElementById('form-id').reset(); // Reset the form
            alert('Data were successfully saved.'); // Show success message
        } else {
            // If the response is not ok, throw an error to be caught by the catch block
            throw new Error('Server responded with an error!');
        }
        return response.json();
    })
    .then(data => console.log('Success:', data)) // Logging success response
    .catch((error) => console.error('Error:', error)); // Handling errors
  }

  // Adding an event listener to the form for the submit event
  document.getElementById('form-id').addEventListener('submit', function(e) {
      e.preventDefault(); // Prevents the default form submission action
      submitInsuredForm(); // Calls the function to submit the form data
  });


src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"