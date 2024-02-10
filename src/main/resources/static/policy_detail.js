    // Creates HTML structure for an editable field
    function createEditableField(fieldId, fieldName, fieldValue) {
        return `
            <div class="editable-field">
                <strong>${fieldName}:</strong>
                <span id="${fieldId}-text" class="view-mode">${fieldValue}</span>
                <input type="text" id="${fieldId}" class="edit-mode" value="${fieldValue}" style="display: none;">
            </div>
        `;
    }

    // Toggles all fields to edit mode
    function toggleAllEdit() {
        document.querySelectorAll('.editable-field').forEach(field => {
            field.classList.add('edit-mode-active'); // Adds class to display inputs
            const span = field.querySelector('span');
            const input = field.querySelector('input');
            input.style.display = 'inline'; // Displays the input field
            input.value = span.innerText; // Sets input value to the text of the span
            span.style.display = 'none'; // Hides the span
        });
        document.getElementById('edit-all').style.display = 'none';
        document.getElementById('save-all').style.display = 'inline';
    }

    // Saves all edited data
    function saveAllData() {
        const queryParams = new URLSearchParams(window.location.search);
        const policyId = queryParams.get('policyId'); // Gets policy ID from URL
        const url = `http://localhost:8080/api/policies/${policyId}`;

        let dataToUpdate = {};
        document.querySelectorAll('.editable-field').forEach(field => {
            const input = field.querySelector('input');
            const fieldId = input.id;
            dataToUpdate[fieldId] = input.value; // Assigns input value to dataToUpdate object
        });

        // Sends updated data to server using fetch API
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // User feedback, e.g., success message, can be added here
        })
        .catch((error) => {
            console.error('Error:', error);
            // Error handling, e.g., displaying an error message, can be done here
        });

        // Reverts all elements back to view mode
        document.querySelectorAll('.editable-field').forEach(field => {
            field.classList.remove('edit-mode-active');
            const span = field.querySelector('span');
            const input = field.querySelector('input');
            span.style.display = 'inline'; // Redisplays the span
            span.innerText = input.value; // Updates the span text according to the input
            input.style.display = 'none'; // Hides the input field
        });
        document.getElementById('edit-all').style.display = 'inline';
        document.getElementById('save-all').style.display = 'none';
    }

    // Loads policy details and fills them into editable fields
    function loadPolicyDetail() {
        const queryParams = new URLSearchParams(window.location.search);
        const policyId = queryParams.get('policyId'); // Gets policy ID from URL
        if (policyId) {
            fetch(`http://localhost:8080/api/policies/${policyId}`)
                .then(response => response.json())
                .then(policy => {
                    const policyFieldsElement = document.getElementById('policyFields');
                    policyFieldsElement.innerHTML = `
                        ${createEditableField('coverageAmount', 'Coverage Amount', policy.coverageAmount)}
                        ${createEditableField('monthlyAmount', 'Monthly Amount', policy.monthlyAmount)}
                        ${createEditableField('policyStartDate', 'Policy Start Date', policy.policyStartDate)}
                        ${createEditableField('policyEndDate', 'Policy End Date', policy.policyEndDate)}
                        ${createEditableField('policyType', 'Policy Type', policy.policyType)}
                        <!-- Additional fields can be added as needed -->
                    `;
                })
                .catch(error => {
                    console.error('Error:', error);
                    policyFieldsElement.innerHTML = `<div class="alert alert-danger" role="alert">Unable to load policy details.</div>`;
                });
        } else {
            policyFieldsElement.innerHTML = `<div class="alert alert-warning" role="alert">No policy ID provided in the URL.</div>`;
        }
    }

    // Deletes a policy
    function deletePolicy() {
        const queryParams = new URLSearchParams(window.location.search);
        const policyId = queryParams.get('policyId');

        if (!policyId) {
            alert('No policy ID provided.');
            return;
        }

        if (confirm('Are you sure you want to delete this policy?')) {
            fetch(`http://localhost:8080/api/policies/${policyId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert('Policy deleted successfully.');
                window.location.href = 'list_of_policies.html'; // Redirects user back to the policy list
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to delete the policy. Error: ' + error.message);
            });
        }
    }

    // Calls loadPolicyDetail when the page loads
    window.onload = loadPolicyDetail;


// Bootstrap and jQuery scripts
src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"