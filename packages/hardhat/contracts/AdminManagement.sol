// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Structures.sol";

contract AdminManagement is Structures{

    // getNumberofDoctors
    function getNumberofDoctors(address _admin) public view onlyAdmin(_admin) returns (uint) {
        return doctorList.length;
    }

    // getDoctor
    function getDoctors(address _admin) public view onlyAdmin(_admin) returns(address[] memory) {
        return doctorList;
    }

    // getNumberofPatients
    function getNumberofPatients(address _admin) public view onlyAdmin(_admin) returns (uint) {
        return patientList.length;
    }

    // get requested list
    function getRequestedDoctorsList(address _admin) public view onlyAdmin(_admin) returns (address[] memory) {
      return requestedDoctorList;
    }

    // confirm Doctor registration request
    function confirmRegistration(address _doctor) public onlyAdmin(msg.sender) {
      require(!isDoctor[_doctor], "This person is already a doctor");

      bool check = false;

      for (uint i = 0; i < requestedDoctorList.length; i++) {
          if (requestedDoctorList[i] == _doctor) {
            check = true;
          }

          if (check == true && i < requestedDoctorList.length - 1) {
            requestedDoctorList[i] = requestedDoctorList[i + 1];
          }
      }

      requestedDoctorList.pop();

      if (check == false) {
        revert("This address has not registered yet");
      } else {
        doctorList.push(_doctor);
        isDoctor[_doctor] = true;
      }     
    }

    // Remove Doctor
    function removeDoctors(address _doctor) public onlyAdmin(msg.sender) {
        require(isDoctor[_doctor], "This person is not a doctor");

        bool mark = false;

        // Remove from the general array
        for (uint i = 0; i < doctorList.length; i++) {
          if (doctorList[i] == _doctor) {
              mark = true;
          }

          if (mark == true && i < doctorList.length - 1) {
            doctorList[i] = doctorList[i + 1];
          }
        }

        doctorList.pop();

        // Remove from the patients' lists
        for (uint i = 0; i < patientList.length; i++) {
          if (patients[patientList[i]].authorizedDoctors[_doctor]) {

            address[] storage list = patients[patientList[i]].doctorsList;

            bool check = false;

            for (uint j = 0; j < list.length; j++) {
              if (list[i] == _doctor) {
                check = true;
              }

              if (check == true && j < list.length - 1) {
                list[j] = list[j + 1];
              }
            }

            list.pop();
          }
        }

        isDoctor[_doctor] = false;
    }
}