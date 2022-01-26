// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Called {

    uint theData = 7;
        
    function thisOneIsOk() external view returns (uint) {
        return theData;
    }

    function thisOneIsNot() external view returns (uint) {
        require (theData < 7, "Uh oh!");
        return theData;
    }
}
