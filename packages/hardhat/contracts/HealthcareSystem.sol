// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Structures.sol";
import "./DoctorManagement.sol";
import "./PatientManagement.sol";
import "./AdminManagement.sol";

contract HealthcareSystem is Structures, DoctorManagement, PatientManagement, AdminManagement {

    constructor () {
        isAdmin[0x49745EF0F5E06f3e0d3F6CcB590F100726202011] = true;
    }

// Functions for both

    // Get appointments
    function getAppointments(address _addr) public view returns(Appointment[] memory) {
        if (isPatient[_addr]) {
            return patients[_addr].appointments;
        } else if (isDoctor[_addr]) {
            return doctors[_addr].appointments;
        }

        Appointment[] memory emptyAppointments = new Appointment[](0);

        return emptyAppointments;
    }

    // Get Patient's info
    function getPatientInfo(address _doctor, address _patient) public view
        returns(
            string memory name,
            string memory phone,
            string memory dob,
            string memory gender,
            string memory bloodType,
            string memory height,
            string memory weight,
            string memory houseAddr,
            string memory allergies,
            Record[] memory records,
            uint recordCount
        ) 
    {

        if (isDoctor[_doctor]) {
            require(patients[_patient].authorizedDoctors[_doctor], "You need to be authorized to view this patient's record");
        } else {
            require(_doctor == _patient);   // Both address is from the patient, who want to view their own record
        }

        Patient storage patient = patients[_patient];

        return (
            patient.name,
            patient.phone,
            patient.dob,
            patient.gender,
            patient.bloodType,
            patient.height,
            patient.weight,
            patient.houseAddr,
            patient.allergies,
            patient.records,
            patient.recordCount
        );
    }

    // Get Doctor's info
    function getDoctorInfo(address _patient, address _doctor) public view 
        returns(
            string memory name,
            string memory major
        ) 
    {
        if (isDoctor[_doctor]  && isPatient[_patient]) {
            require(patients[_patient].authorizedDoctors[_doctor], "This doctor is not authorized to work with you");
        } else {
            require(_doctor == _patient);   // Both address is from the doctor, who want to view their own profle or the admin
        }
        

        Doctor storage doctor = doctors[_doctor];

        return (
            doctor.name,
            doctor.major
        );
    }
}