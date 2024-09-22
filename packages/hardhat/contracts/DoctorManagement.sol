// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Structures.sol";

contract DoctorManagement is Structures{

    // Doctors set their profile
    function setDoctorProfile(string memory _name, string memory _major) public payable {

        require(!isDoctor[msg.sender], "Doctor profile already exists!");
        require(!isPatient[msg.sender], "You are already a patient!");

        for (uint i = 0; i < requestedDoctorList.length; i++) {
          if (msg.sender == requestedDoctorList[i]) {
            revert("You already requested to be a doctor");
          }
        }

        Doctor storage doctor = doctors[msg.sender];
        doctor.name = _name;
        doctor.major = _major;

        requestedDoctorList.push(msg.sender);
    }

    // Request from doctors
    function requestAccess(address _patient) public payable {

      require(isDoctor[msg.sender], "Only doctors can request access");
      require(isPatient[_patient], "The address should be a patient");
      
      Patient storage patient = patients[_patient];

      for (uint i = 0; i < patient.requestedDoctors.length; i++) {
        if (msg.sender == patient.requestedDoctors[i]) {
            revert("You have already required access");
        }
      }

      for (uint i = 0; i < patient.doctorsList.length; i++) {
        if (msg.sender == patient.doctorsList[i]) {
            revert("You are already in the doctor list");
        }
      }

      patients[_patient].requestedDoctors.push(msg.sender);
    }

    // Doctor retrieves list of patients
    function getPatientsList(address _doctor) public view returns(address[] memory) {

        return doctors[_doctor].patientsList;
    }

    // Authorized doctors add record to patient's profile
    function addRecord(address _patient, string memory _description, string memory _diagnosis, string memory _treatment, string memory _imageUrl) public onlyAuthorizedDoctors(_patient) {

        require(isDoctor[msg.sender], "Only doctors can create new record");
        require(isPatient[_patient], "That address is not a patient");

        Patient storage patient = patients[_patient];

        patient.records.push(Record({
            id: patient.recordCount,
            description: _description,
            diagnosis: _diagnosis,
            treatment: _treatment,
            imageUrl: _imageUrl,
            createdTimestamp: block.timestamp
        }));

        patient.recordCount++;

        emit RecordAdded(_patient, msg.sender, block.timestamp);
    }

    // Retrieve requested appointments
    function getRequestedAppointments(address _doctor) public view returns(Appointment[] memory) {

        require (isDoctor[_doctor], "Only doctors can access requested appointments");

        return doctors[_doctor].requestedAppointments;
    }

    // Accept appointment
    function acceptAppointment(address _patient) public {
        
        require(isDoctor[msg.sender], "Only doctors can accept appointments");

        Appointment[] storage requested = doctors[msg.sender].requestedAppointments;

        for (uint i = 0; i < requested.length; i++) {
            if (requested[i].patientaddr == _patient) {

                sortAppointments(doctors[msg.sender].appointments, requested[i]);
                sortAppointments(patients[_patient].appointments, requested[i]);

                requested[i] = requested[requested.length - 1];
                requested.pop();

                break;
            }
        }
    }

    // Sort appointments according to time
    function sortAppointments(Appointment[] storage appointments, Appointment memory requested) private {

        uint point = 0;
        bool shift = false;

        for (uint i = 0; i < appointments.length; i++) {
            if (requested.date < appointments[i].date || (requested.date == appointments[i].date && requested.time <= appointments[i].time)) {
                point = i;
                shift = true;
                break;
            }
        }

        appointments.push(requested);

        if (shift == true) {

            for (uint i = appointments.length - 1; i > point; i--) {
                appointments[i] = appointments[i - 1];
            }

            appointments[point] = requested;
        }
    }
}