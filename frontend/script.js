const baseUrl = 'http://localhost:3000'; // Base URL for API requests

// Utility to fetch and display records
function fetchRecords(endpoint, listId) {
  fetch(`${baseUrl}/${endpoint}`)
    .then((response) => response.json())
    .then((data) => {
      const listElement = document.getElementById(listId);
      listElement.innerHTML = '';
      data.forEach((item) => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p>${Object.values(item).join(' | ')}</p>
        `;
        listElement.appendChild(div);
      });
    })
    .catch((error) => console.error('Error fetching records:', error));
}

// Utility to add a record
function addRecord(endpoint, formId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch(`${baseUrl}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert('Record added successfully');
        form.reset();
        fetchRecords(endpoint, `${endpoint}List`);
      } else {
        alert('Failed to add record');
      }
    })
    .catch((error) => console.error('Error adding record:', error));
}

// Utility to delete a record
function deleteRecord(endpoint, id) {
  fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        alert('Record deleted successfully');
        location.reload(); // Refresh the page to reload records
      } else {
        alert('Failed to delete record');
      }
    })
    .catch((error) => console.error('Error deleting record:', error));
}

// Utility to update a record
function updateRecord(endpoint, formId, idFieldId) {
  const form = document.getElementById(formId);
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Ensure ID is converted to a number
  const id = Number(document.getElementById(idFieldId).value);
  
  // Remove empty fields to prevent overwriting with empty values
  Object.keys(data).forEach(key => {
    if (data[key] === '') {
      delete data[key];
    }
  });

  fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert('Record updated successfully');
        form.reset();
        fetchRecords(endpoint, `${endpoint}List`);
      } else {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Failed to update record');
        });
      }
    })
    .catch((error) => {
      console.error('Error updating record:', error);
      alert(error.message || 'Failed to update record');
    });
}
// ==================== Event Listeners ====================
document.addEventListener('DOMContentLoaded', () => {
  // ==================== Patients ====================
  if (document.getElementById('addPatientForm')) {
    document.getElementById('addPatientForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('patients', 'addPatientForm');
    });
  }

  if (document.getElementById('updatePatientForm')) {
    document.getElementById('updatePatientForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('patients', 'updatePatientForm', 'UpdatePID');
    });
  }

  if (document.getElementById('fetchPatientsBtn')) {
    document.getElementById('fetchPatientsBtn').addEventListener('click', () => {
      fetchRecords('patients', 'patientList');
    });
  }

  // ==================== Medicines ====================
  if (document.getElementById('addMedicineForm')) {
    document.getElementById('addMedicineForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('medicines', 'addMedicineForm');
    });
  }

  if (document.getElementById('updateMedicineForm')) {
    document.getElementById('updateMedicineForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('medicines', 'updateMedicineForm', 'medicineId');
    });
  }

  if (document.getElementById('fetchMedicinesBtn')) {
    document.getElementById('fetchMedicinesBtn').addEventListener('click', () => {
      fetchRecords('medicines', 'medicineList');
    });
  }

  // ==================== Bills ====================
  if (document.getElementById('addBillForm')) {
    document.getElementById('addBillForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('bills', 'addBillForm');
    });
  }

  if (document.getElementById('updateBillForm')) {
    document.getElementById('updateBillForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('bills', 'updateBillForm', 'billId');
    });
  }

  if (document.getElementById('fetchBillsBtn')) {
    document.getElementById('fetchBillsBtn').addEventListener('click', () => {
      fetchRecords('bills', 'billList');
    });
  }

  // ==================== Delivery ====================
  if (document.getElementById('addDeliveryForm')) {
    document.getElementById('addDeliveryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('deliveries', 'addDeliveryForm');
    });
  }

  if (document.getElementById('updateDeliveryForm')) {
    document.getElementById('updateDeliveryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('deliveries', 'updateDeliveryForm', 'deliveryId');
    });
  }

  if (document.getElementById('fetchDeliveriesBtn')) {
    document.getElementById('fetchDeliveriesBtn').addEventListener('click', () => {
      fetchRecords('deliveries', 'deliveryList');
    });
  }

  // ==================== Tests ====================
  if (document.getElementById('addTestForm')) {
    document.getElementById('addTestForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('tests', 'addTestForm');
    });
  }

  if (document.getElementById('updateTestForm')) {
    document.getElementById('updateTestForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('tests', 'updateTestForm', 'testId');
    });
  }

  if (document.getElementById('fetchTestsBtn')) {
    document.getElementById('fetchTestsBtn').addEventListener('click', () => {
      fetchRecords('tests', 'testList');
    });
  }

  // ==================== Appointments ====================
  if (document.getElementById('addAppointmentForm')) {
    document.getElementById('addAppointmentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      addRecord('appointments', 'addAppointmentForm');
    });
  }

  if (document.getElementById('updateAppointmentForm')) {
    document.getElementById('updateAppointmentForm').addEventListener('submit', (e) => {
      e.preventDefault();
      updateRecord('appointments', 'updateAppointmentForm', 'appointmentId');
    });
  }

  if (document.getElementById('fetchAppointmentsBtn')) {
    document.getElementById('fetchAppointmentsBtn').addEventListener('click', () => {
      fetchRecords('appointments', 'appointmentList');
    });
  }
});
