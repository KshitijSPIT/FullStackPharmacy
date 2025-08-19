CREATE DATABASE Pharmacy;
USE Pharmacy;

CREATE TABLE Patient (
    Pid INT PRIMARY KEY,
    PName VARCHAR(50) NOT NULL,
    PAddress VARCHAR(100) NOT NULL,
    PAge INT,
    PGender CHAR(1),
    PBloodGroup VARCHAR(50),
    PDOB DATE
);

ALTER TABLE Patient
ADD Contact BIGINT;

INSERT INTO Patient(Pid, PName, PAddress, PAge, PGender, PBloodGroup, PDOB)
VALUES
(1, 'Alice Smith', '123 Maple Street, Springfield', 29, 'F', 'A+', '1995-04-12'),
(2, 'Bob Johnson', '456 Oak Avenue, Metropolis', 35, 'M', 'O-', '1989-07-23'),
(3, 'Carol Davis', '789 Pine Road, Gotham', 42, 'F', 'B+', '1982-11-05'),
(4, 'David Wilson', '101 Birch Lane, Star City', 27, 'M', 'AB-', '1997-06-30'),
(5, 'Emily Brown', '202 Cedar Blvd, Smallville', 31, 'F', 'O+', '1993-01-16');

SET SQL_SAFE_UPDATES = 0;

UPDATE Patient
SET Contact = CASE
    WHEN Pid = 1 THEN 9632759375
    WHEN Pid = 2 THEN 5733579378
    WHEN Pid = 3 THEN 6483468695
    WHEN Pid = 4 THEN 5762579479
    WHEN Pid = 5 THEN 5784857947
    ELSE NULL
END
WHERE Pid IN (1, 2, 3, 4, 5);

SELECT * FROM Patient;

CREATE TABLE Test (
    TID INT PRIMARY KEY,
    TName VARCHAR(500) NOT NULL UNIQUE,
    TType VARCHAR(500) NOT NULL,
    TCharge INT,
    TResult VARCHAR(100)
);

INSERT INTO Test(TID, TName, TType, TCharge, TResult)
VALUES
(1, 'Complete Blood Count', 'Blood', 50, 'Normal'),
(2, 'Urinalysis', 'Urine', 30, 'Normal'),
(3, 'Lipid Profile', 'Blood', 60, 'Elevated Cholesterol'),
(4, 'Glucose Test', 'Blood', 40, 'Normal'),
(5, 'Thyroid Function Test', 'Blood', 55, 'Hypothyroidism');

SELECT * FROM Test;

CREATE TABLE Bill (
    BillID INT PRIMARY KEY,
    BillDate DATE,
    CustomerID INT,
    CustomerName VARCHAR(500),
    TotalAmount INT,
    PaymentMethod VARCHAR(50) CHECK (PaymentMethod IN ('Cash', 'Credit Card', 'Debit Card')),
    PrescriptionID INT,
    TaxAmount INT,
    TotalPaid INT,
    FOREIGN KEY (PrescriptionID) REFERENCES Test(TID)
);

INSERT INTO Bill(BillID, BillDate, CustomerID, CustomerName, TotalAmount, PaymentMethod, PrescriptionID, TaxAmount, TotalPaid)
VALUES
(1, '2024-08-20', 101, 'John Doe', 150, 'Credit Card', 1, 15, 165),
(2, '2024-08-21', 102, 'Jane Smith', 80, 'Cash', NULL, 8, 88),
(3, '2024-08-22', 103, 'Alice Johnson', 120, 'Debit Card', 2, 12, 132),
(4, '2024-08-23', 104, 'Michael Brown', 95, 'Credit Card', NULL, 9.5, 104.5),
(5, '2024-08-24', 105, 'Emily Davis', 200, 'Cash', 3, 20, 220);

SELECT * FROM Bill;

CREATE TABLE Medicines (
    MID INT PRIMARY KEY,
    MName VARCHAR(255),
    ExpDate DATE,
    Price INT
);

INSERT INTO Medicines(MID, MName, ExpDate, Price)
VALUES
(1, 'Paracetamol', '2025-12-31', 50),
(2, 'Crocin', '2026-06-15', 75),
(3, 'Antacid', '2024-11-20', 30),
(4, 'Cough Syrup', '2025-04-05', 120),
(5, 'Antibiotic', '2024-10-10', 200);

CREATE TABLE Appointments (
    DId INT PRIMARY KEY,
    DName VARCHAR(255),
    Fees INT,
    Age INT,
    Specialization VARCHAR(255),
    Location VARCHAR(255)
);

ALTER TABLE Appointments
ADD Contact BIGINT;

INSERT INTO Appointments(DId, Contact, DName, Fees, Age, Specialization, Location)
VALUES
(1, 9876543210, 'Dr. Patel', 1500, 45, 'Cardiology', 'Mumbai'),
(2, 8765432109, 'Dr. Deshmukh', 1200, 38, 'Dermatology', 'Pune'),
(3, 7654321098, 'Dr. Kulkarni', 2000, 50, 'Neurology', 'Navi Mumbai'),
(4, 6543210987, 'Dr. Shah', 1800, 42, 'Orthopedics', 'Thane'),
(5, 5432109876, 'Dr. Naik', 1000, 33, 'Pediatrics', 'Kalyan');

CREATE TABLE Delivery (
    DId INT PRIMARY KEY,
    DName VARCHAR(255),
    Contact BIGINT NOT NULL
);

INSERT INTO Delivery(DId, DName, Contact)
VALUES
(1, 'Amit Kumar', 9876543210),
(2, 'Priya Sharma', 8765432109),
(3, 'Ravi Desai', 7654321098),
(4, 'Anita Singh', 6543210987),
(5, 'Vikram Patel', 5432109876);

COMMIT;
