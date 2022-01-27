// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Called} from "./Called.sol";

contract Calling {

    uint public data = 5;
    address calledAddr;

    constructor (address _calledAddr) {
        calledAddr = _calledAddr;
    }

    function castThenCallOk() external {
        Called otherContract = Called(calledAddr);
        data = otherContract.thisOneIsOk();
    }

    function abiEncodeThenCallOk() external {
        bytes memory callSig = abi.encodeWithSignature("thisOneIsOk()");
        (bool success, bytes memory returnedData) = calledAddr.call(callSig);
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        } else {
            data = 0;
        }
    }
                                         
    function delegatecallOk() external {
        bytes memory callSig = abi.encodeWithSignature("thisOneIsOk()");
        (bool success, bytes memory returnedData) = calledAddr.delegatecall(callSig);
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        } else {
            data = 0;
        }
    }
                                         
    function castThenCallMaybe() external {
        Called otherContract = Called(calledAddr);
        data = otherContract.thisOneMaybeNot();
    }

    function abiEncodeThenCallMaybe() external {
        bytes memory callSig = abi.encodeWithSignature("thisOneMaybeNot()");
        (bool success, bytes memory returnedData) = calledAddr.call(callSig);
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        } else {
            data = 0;
        }
    }
                                         
    function delegatecallMaybe() external {
        bytes memory callSig = abi.encodeWithSignature("thisOneMaybeNot()");
        (bool success, bytes memory returnedData) = calledAddr.delegatecall(callSig);
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        } else {
            data = 0;
        }
    }
                                         
}
