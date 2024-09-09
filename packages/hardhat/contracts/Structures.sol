// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Structures {
    struct Patient {
        string name;
        string phone;
        string dob;
        string gender;
        string bloodType;
        string height;
        string weight;
        string houseAddr;
        string allergies;
        Record[] records;
        uint recordCount;
        mapping(address => bool) authorizedDoctors;
        address[] requestedDoctors;
        address[] doctorsList;
        Appointment[] appointments;
    }

    struct Doctor {
        string name;
        string major;
        address[] patientsList;
        Appointment[] requestedAppointments;
        Appointment[] appointments;
    }

    struct Admin {
        string name;
    }

    struct Record {
        uint id;
        string description;
        string diagnosis;
        string treatment;
        string imageUrl;
        uint createdTimestamp;
    }

    struct Appointment {
        address patientaddr;
        address doctoraddr;
        uint date;
        uint time;
        string description;
    }

    address[] public patientList;
    address[] public doctorList;
    address[] public requestedDoctorList;

    mapping(address => Patient) patients;
    mapping(address => Doctor) doctors;

    mapping(address => bool) public isDoctor;
    mapping(address => bool) public isPatient;
    mapping(address => bool) public isAdmin;

    event RecordAdded(address patient, address doctor, uint timestamp);
    event RecordUpdated(address patient, address doctor, uint timestamp);
    event GrantAccessFailed(address patient, address doctor);
    event AppointmentRequested(address patient, address doctor, string date, string time);

    // Check if the healthcare doctors are authorized
    modifier onlyAuthorizedDoctors(address _patient) {
        require(
            patients[_patient].authorizedDoctors[msg.sender],
            "You are not authorized to view this record"
        );
        _;
    }

    // Only the admin is authorized
    modifier onlyAdmin(address _admin) {
      require(_admin == 0x49745EF0F5E06f3e0d3F6CcB590F100726202011, "Not authorized: Only the admin can perform this action");
      _;
    }
}