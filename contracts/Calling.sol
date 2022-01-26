// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {Called} from "./Called.sol";

contract Calling {

    uint public data = 5;
    address calledAddr;

    constructor (address _calledAddr) {
        calledAddr = _calledAddr;
    }

    function doStuff1() external {
        Called otherContract = Called(calledAddr);
        data = otherContract.thisOneIsOk();
    }

    function doStuff2() external {
        Called otherContract = Called(calledAddr);
        data = otherContract.thisOneIsNot();
    }

    function doStuff3() external {
        (bool success, bytes memory returnedData) = calledAddr.call(abi.encodeWithSignature("thisOneIsOk()"));
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        }
    }
                                         
    function doStuff4() external {
        (bool success, bytes memory returnedData) = calledAddr.call(abi.encodeWithSignature("thisOneIsNot()"));
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        }
    }
                                         
    function doStuff5() external {
        (bool success, bytes memory returnedData) = calledAddr.delegatecall(abi.encodeWithSignature("thisOneIsOk()"));
        if (success) {
            (uint dataBack) = abi.decode(returnedData, (uint));
            data = dataBack;
        }
    }
                                         
}
