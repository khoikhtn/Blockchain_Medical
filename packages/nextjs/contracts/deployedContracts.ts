/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    HealthcareSystem: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "date",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "time",
              type: "string",
            },
          ],
          name: "AppointmentRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
          ],
          name: "GrantAccessFailed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "RecordAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "patient",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "doctor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          name: "RecordUpdated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
          ],
          name: "acceptAppointment",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
            {
              internalType: "string",
              name: "_diagnosis",
              type: "string",
            },
            {
              internalType: "string",
              name: "_treatment",
              type: "string",
            },
            {
              internalType: "string",
              name: "_imageUrl",
              type: "string",
            },
          ],
          name: "addRecord",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "confirmRegistration",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "doctorList",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_addr",
              type: "address",
            },
          ],
          name: "getAppointments",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "patientaddr",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "doctoraddr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "date",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "time",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
              ],
              internalType: "struct Structures.Appointment[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "getDoctorInfo",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "major",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_admin",
              type: "address",
            },
          ],
          name: "getDoctors",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
          ],
          name: "getDoctorsList",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_admin",
              type: "address",
            },
          ],
          name: "getNumberofDoctors",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_admin",
              type: "address",
            },
          ],
          name: "getNumberofPatients",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
          ],
          name: "getPatientInfo",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "string",
              name: "phone",
              type: "string",
            },
            {
              internalType: "string",
              name: "dob",
              type: "string",
            },
            {
              internalType: "string",
              name: "gender",
              type: "string",
            },
            {
              internalType: "string",
              name: "bloodType",
              type: "string",
            },
            {
              internalType: "string",
              name: "height",
              type: "string",
            },
            {
              internalType: "string",
              name: "weight",
              type: "string",
            },
            {
              internalType: "string",
              name: "houseAddr",
              type: "string",
            },
            {
              internalType: "string",
              name: "allergies",
              type: "string",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "diagnosis",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "treatment",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "imageUrl",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "createdTimestamp",
                  type: "uint256",
                },
              ],
              internalType: "struct Structures.Record[]",
              name: "records",
              type: "tuple[]",
            },
            {
              internalType: "uint256",
              name: "recordCount",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "getPatientsList",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "getRequestedAppointments",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "patientaddr",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "doctoraddr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "date",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "time",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
              ],
              internalType: "struct Structures.Appointment[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
          ],
          name: "getRequestedDoctors",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_admin",
              type: "address",
            },
          ],
          name: "getRequestedDoctorsList",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "grantAccess",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isAdmin",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isDoctor",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "isPatient",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "patientList",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
          ],
          name: "removeDoctors",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_patient",
              type: "address",
            },
          ],
          name: "requestAccess",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_date",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_time",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_description",
              type: "string",
            },
          ],
          name: "requestAppointment",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "requestedDoctorList",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_doctors",
              type: "address",
            },
          ],
          name: "revokeAccess",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_major",
              type: "string",
            },
          ],
          name: "setDoctorProfile",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_phone",
              type: "string",
            },
            {
              internalType: "string",
              name: "_dob",
              type: "string",
            },
            {
              internalType: "string",
              name: "_gender",
              type: "string",
            },
            {
              internalType: "string",
              name: "_bloodType",
              type: "string",
            },
            {
              internalType: "string",
              name: "_height",
              type: "string",
            },
            {
              internalType: "string",
              name: "_weight",
              type: "string",
            },
            {
              internalType: "string",
              name: "_houseAddr",
              type: "string",
            },
            {
              internalType: "string",
              name: "_allergies",
              type: "string",
            },
          ],
          name: "setPatientProfile",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        doctorList: "contracts/AdminManagement.sol",
        isAdmin: "contracts/AdminManagement.sol",
        isDoctor: "contracts/AdminManagement.sol",
        isPatient: "contracts/AdminManagement.sol",
        patientList: "contracts/AdminManagement.sol",
        requestedDoctorList: "contracts/AdminManagement.sol",
        acceptAppointment: "contracts/DoctorManagement.sol",
        addRecord: "contracts/DoctorManagement.sol",
        getPatientsList: "contracts/DoctorManagement.sol",
        getRequestedAppointments: "contracts/DoctorManagement.sol",
        requestAccess: "contracts/DoctorManagement.sol",
        setDoctorProfile: "contracts/DoctorManagement.sol",
        getDoctorsList: "contracts/PatientManagement.sol",
        getRequestedDoctors: "contracts/PatientManagement.sol",
        grantAccess: "contracts/PatientManagement.sol",
        requestAppointment: "contracts/PatientManagement.sol",
        revokeAccess: "contracts/PatientManagement.sol",
        setPatientProfile: "contracts/PatientManagement.sol",
        confirmRegistration: "contracts/AdminManagement.sol",
        getDoctors: "contracts/AdminManagement.sol",
        getNumberofDoctors: "contracts/AdminManagement.sol",
        getNumberofPatients: "contracts/AdminManagement.sol",
        getRequestedDoctorsList: "contracts/AdminManagement.sol",
        removeDoctors: "contracts/AdminManagement.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
