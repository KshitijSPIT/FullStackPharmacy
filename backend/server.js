const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./dbConfig");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());



// Other routes can be added similarly...
// Get all patients
app.get("/patients", (req, res) => {
    db.query("SELECT * FROM Patient", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving patients");
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new patient
  app.post("/patients", (req, res) => {
    const { PName, PAddress, PAge, PGender, PBloodGroup, PDOB, Contact } = req.body;
    const query = "INSERT INTO Patient (PName, PAddress, PAge, PGender, PBloodGroup, PDOB, Contact) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [PName, PAddress, PAge, PGender, PBloodGroup, PDOB, Contact], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding patient");
      } else {
        res.status(201).send("Patient added successfully");
      }
    });
  });
  
  
  // Update patient details
app.put("/patients/:id", (req, res) => {
    const { id } = req.params;
    const { PName, PAddress, PAge, PGender, PBloodGroup, PDOB, Contact } = req.body;
    const query = "UPDATE Patient SET PName = ?, PAddress = ?, PAge = ?, PGender = ?, PBloodGroup = ?, PDOB = ?, Contact = ? WHERE Pid = ?";
    db.query(query, [PName, PAddress, PAge, PGender, PBloodGroup, PDOB, Contact, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating patient");
      } else {
        res.send("Patient updated successfully");
      }
    });
  });
  
  // Delete a patient
app.delete("/patients/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Patient WHERE Pid = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting patient");
      } else {
        res.send("Patient deleted successfully");
      }
    });
  });

// Get all tests
app.get("/tests", (req, res) => {
    db.query("SELECT * FROM Test", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving tests");
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new test
  app.post("/tests", (req, res) => {
    const { TName, TType, TCharge, TResult } = req.body;
    const query = "INSERT INTO Test (TName, TType, TCharge, TResult) VALUES (?, ?, ?, ?)";
    db.query(query, [TName, TType, TCharge, TResult], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding test");
      } else {
        res.status(201).send("Test added successfully");
      }
    });
  });
  
  // Update test details
  app.put("/tests/:id", (req, res) => {
    const { id } = req.params;
    const { TName, TType, TCharge, TResult } = req.body;
    const query = "UPDATE Test SET TName = ?, TType = ?, TCharge = ?, TResult = ? WHERE TID = ?";
    db.query(query, [TName, TType, TCharge, TResult, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating test");
      } else {
        res.send("Test updated successfully");
      }
    });
  });
  
  // Delete a test
  app.delete("/tests/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Test WHERE TID = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting test");
      } else {
        res.send("Test deleted successfully");
      }
    });
  });
// Get all medicines
app.get("/medicines", (req, res) => {
  db.query("SELECT * FROM Medicines", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving medicines");
    } else {
      res.json(results);
    }
  });
});

// Add a new medicine
app.post("/medicines", (req, res) => {
    const { MName, ExpDate, Price } = req.body;
    const query = "INSERT INTO Medicines (MName, ExpDate, Price) VALUES (?, ?, ?)";
    db.query(query, [MName, ExpDate, Price], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding medicine");
      } else {
        res.status(201).send("Medicine added successfully");
      }
    });
  });
  
// Update medicine details
app.put("/medicines/:id", (req, res) => {
  const { id } = req.params;
  const { MName, ExpDate, Price } = req.body;
  const query = "UPDATE Medicines SET MName = ?, ExpDate = ?, Price = ? WHERE MID = ?";
  db.query(query, [MName, ExpDate, Price, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error updating medicine");
    } else {
      res.send("Medicine updated successfully");
    }
  });
});

// Delete a medicine
app.delete("/medicines/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM Medicines WHERE MID = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting medicine");
    } else {
      res.send("Medicine deleted successfully");
    }
  });
});


  // Get all bills
app.get("/bills", (req, res) => {
    db.query("SELECT * FROM Bill", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving bills");
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new bill
  app.post("/bills", (req, res) => {
    const { BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid } = req.body;
    const query = "INSERT INTO Bill (BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding bill");
      } else {
        res.status(201).send("Bill added successfully");
      }
    });
  });
  
  // Update bill details
  app.put("/bills/:id", (req, res) => {
    const { id } = req.params;
    const { BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid } = req.body;
    const query = "UPDATE Bill SET BillDate = ?, CustomerID = ?, CustomerName = ?, TotalAmount = ?, PaymentMethod = ?, PrescriptionID = ?, TaxAmount = ?, TotalPaid = ? WHERE BillID = ?";
    db.query(query, [BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating bill");
      } else {
        res.send("Bill updated successfully");
      }
    });
  });
  
  // Delete a bill
  app.delete("/bills/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Bill WHERE BillID = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting bill");
      } else {
        res.send("Bill deleted successfully");
      }
    });
  });
  //Delivery
  app.get("/delivery", (req, res) => {
    db.query("SELECT * FROM Delivery", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving delivery details");
      } else {
        res.json(results);
      }
    });
  });

  app.post("/delivery", (req, res) => {
    const { Dname,Contact } = req.body;
    const query = "INSERT INTO Delivery (Dname,Contact) VALUES (?, ?)";
    db.query(query, [Dname,Contact ], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding Delivery Details");
      } else {
        res.status(201).send("Delivery Details added successfully");
      }
    });
  });
  app.put("/delivery/:id", (req, res) => {
    const { id } = req.params;
    const { Dname,Contact } = req.body;
    const query = "UPDATE Delivery SET Dname=?, Contact =? ";
    db.query(query, [ Dname,Contact, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating Delivery");
      } else {
        res.send("Delivery updated successfully");
      }
    });
  });
  app.delete("/bills/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Delivery WHERE DId = ?", [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting Delivery");
      } else {
        res.send("Delivery deleted successfully");
      }
    });
  });
  
  app.get("/appointments", (req, res) => {
    db.query("SELECT * FROM Appointments", (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving appointments");
      } else {
        res.json(results);
      }
    });
  });
  
  // Add a new appointment
  app.post("/appointments", (req, res) => {
    const { DName, Fees, Age, Specialization, Location } = req.body;
    const query =
      "INSERT INTO Appointments (DName, Fees, Age, Specialization, Location) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [DName, Fees, Age, Specialization, Location], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error adding appointment");
      } else {
        res.status(201).send("Appointment added successfully");
      }
    });
  });
  
  // Update an appointment
  app.put("/appointments/:id", (req, res) => {
    const { id } = req.params;
    const { DName, Fees, Age, Specialization, Location } = req.body;
    const query =
      "UPDATE Appointments SET DName = ?, Fees = ?, Age = ?, Specialization = ?, Location = ? WHERE DId = ?";
    db.query(query, [DName, Fees, Age, Specialization, Location, id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating appointment");
      } else {
        res.send("Appointment updated successfully");
      }
    });
  });
  
  // Delete an appointment
  app.delete("/appointments/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM Appointments WHERE DId = ?", [id], (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting appointment");
      } else {
        res.send("Appointment deleted successfully");
      }
    });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
