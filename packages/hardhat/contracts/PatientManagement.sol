// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Structures.sol";

contract PatientManagement is Structures {

    // Patients set their profile
    function setPatientProfile(
        string memory _name,
        string memory _phone,
        string memory _dob,
        string memory _gender,
        string memory _bloodType,
        string memory _height,
        string memory _weight,
        string memory _houseAddr,
        string memory _allergies
    ) public payable {
        require(!isPatient[msg.sender], "Patient profile already exists");
        require(!isDoctor[msg.sender], "You are already a doctor!");

        Patient storage patient = patients[msg.sender];

        patient.name = _name;
        patient.phone = _phone;
        patient.dob = _dob;
        patient.gender = _gender;
        patient.bloodType = _bloodType;
        patient.height = _height;
        patient.weight = _weight;
        patient.houseAddr = _houseAddr;
        patient.allergies = _allergies;
        patient.recordCount = 0;

        isPatient[msg.sender] = true;

        patientList.push(msg.sender);
    }

    // Patient retrieves requested doctors
    function getRequestedDoctors(address _patient) public view returns(address[] memory) {

        //require(isPatient[_patient], "This should be a patient");

        Patient storage patient = patients[_patient];

        return patient.requestedDoctors;
    }

    // Patients grant access to doctors
    function grantAccess(address _doctor) public {

        require(isPatient[msg.sender], "Only patients can grant access");

        address[] storage requested = patients[msg.sender].requestedDoctors;

        bool check = false;

        for (uint i = 0; i < requested.length; i++) {
          if (requested[i] == _doctor) {
            requested[i] = requested[requested.length - 1];
            requested.pop();
            check = true;
            break;
          }
        }

        if (check == true) {
            patients[msg.sender].authorizedDoctors[_doctor] = true;       // Authorize this doctor

            doctors[_doctor].patientsList.push(msg.sender);               // Add this patient to the list of the doctor

            patients[msg.sender].doctorsList.push(_doctor);              // Add this doctor to the list of the patient

        } else {
            emit GrantAccessFailed(msg.sender, _doctor);
        }
    }

    // Patients revoke access to doctors
    function revokeAccess(address _doctors) public {

        require(isPatient[msg.sender], "Only patients can revoke access");

        patients[msg.sender].authorizedDoctors[_doctors] = false;
    }

    // Patient retrieves list of doctors
    function getDoctorsList(address _patient) public view returns(address[] memory) {

        Patient storage patient = patients[_patient];

        return patient.doctorsList;
    }

    // Request Appointments
    function requestAppointment(address _doctor, uint _date, uint _time, string memory _description) public {

        require(patients[msg.sender].authorizedDoctors[_doctor], "This doctor is not authorized to work with you");

        Doctor storage doctor = doctors[_doctor];

        for (uint i = 0; i < doctor.requestedAppointments.length; i++) {
            if (msg.sender == doctor.requestedAppointments[i].patientaddr) {
                revert ("You already requested this doctor");
            }
        }

        for (uint i = 0; i < doctor.appointments.length; i++) {
            if (msg.sender == doctor.appointments[i].patientaddr) {
                revert ("You already have an appointment with this doctor");
            }
        }

        doctor.requestedAppointments.push(Appointment ({
            patientaddr: msg.sender,
            doctoraddr: _doctor,
            date: _date,
            time: _time,
            description: _description
        }));
    }
}