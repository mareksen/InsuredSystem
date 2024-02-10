
    // Function to create HTML structure with an editable field
    function createEditableField(fieldId, fieldName, fieldValue) {
        return `
            <div class="editable-field">
                <strong>${fieldName}:</strong>
                <span id="${fieldId}-text" contenteditable="false">${fieldValue}</span>
            </div>
        `;
    }

    // Function to toggle all fields into edit mode
    function toggleAllEdit() {
        document.querySelectorAll('.editable-field span').forEach(field => {
            field.contentEditable = true;
        });
        document.getElementById('edit-all').style.display = 'none';
        document.getElementById('save-all').style.display = 'inline';
    }

    // Function to save all data
    function saveAllData() {
        const queryParams = new URLSearchParams(window.location.search);
        const insuredId = queryParams.get('insuredId');
        const url = `http://localhost:8080/api/insured/${insuredId}`;

        let dataToUpdate = {};
        document.querySelectorAll('.editable-field span').forEach(field => {
            const fieldId = field.id.replace('-text', '');
            dataToUpdate[fieldId] = field.innerText;
            field.contentEditable = false;
        });

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
            // Possible user feedback can be added here
        })
        .catch((error) => {
            console.error('Error:', error);
            // Error handling can be implemented here
        });

        document.getElementById('edit-all').style.display = 'inline';
        document.getElementById('save-all').style.display = 'none';
    }

    // Function to load insured person's details
    function loadInsuredDetail() {
        const queryParams = new URLSearchParams(window.location.search);
        const insuredId = queryParams.get('insuredId');

        if (insuredId) {
            fetch(`http://localhost:8080/api/insured/${insuredId}`)
                .then(response => response.json())
                .then(insured => {
                    const insuredDetailsElement = document.getElementById('insuredDetails').querySelector('.card-body');
                    insuredDetailsElement.innerHTML = `
                        ${createEditableField('firstName', 'First Name', insured.firstName)}
                        ${createEditableField('lastName', 'Last Name', insured.lastName)}
                        ${createEditableField('email', 'E-mail Address', insured.email)}
                        ${createEditableField('phone', 'Phone Number', insured.phone)}
                        ${createEditableField('residence', 'Residence', insured.residence)}
                        ${createEditableField('placeOfBirth', 'Place of Birth', insured.placeOfBirth)}
                        ${createEditableField('dateOfBirth', 'Date of Birth', insured.dateOfBirth)}
                        ${createEditableField('socialSecurityNumber', 'Social Security Number', insured.socialSecurityNumber)}
                        ${createEditableField('maritalStatus', 'Marital Status', insured.maritalStatus)}
                    `;
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('insuredDetails').innerHTML = `<div class="alert alert-danger" role="alert">Unable to load insured details.</div>`;
                });
        } else {
            document.getElementById('insuredDetails').innerHTML = `<div class="alert alert-warning" role="alert">No insured ID provided in the URL.</div>`;
        }
    }

    // Function to delete an insured person
    function deleteInsured() {
        const queryParams = new URLSearchParams(window.location.search);
        const insuredId = queryParams.get('insuredId');

        if (!insuredId) {
            alert('No insured ID provided.');
            return;
        }

        if (confirm('Are you sure you want to delete this insured person?')) {
            fetch(`http://localhost:8080/api/insured/${insuredId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert('Insured person deleted successfully.');
                    window.location.href = 'list_of_insured.html'; // Adjust according to URL structure
                } else {
                    response.text().then(text => { throw new Error(text) });
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Failed to delete the insured person. Error: ' + error.message);
            });
        }
    }

    // Load insured person's details when the window is loaded
    window.onload = loadInsuredDetail;


src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"