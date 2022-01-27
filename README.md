# calling-variations

To use:

1. `git clone https://github.com/Hacker-DAO/calling-variations.git`
2. Read the two contracts in `calling-variations/contracts`. They illustrate three different ways the `Calling` contract can call the two functions on the `Called` contract.
3. Decide what the value of the storage variable `uint data` will be on the `Calling` contract after calling each of its six functions `castThenCallOk`, `abiEncodeThenCallOk`, etc.. 
4. Write down your answers.
5. Look at `calling-variations/test/calling.js` for the correct answers.
6. Run the tests to verify this:
    1. `cd calling-variations`
    2. `npm install`
    3. `npx hardhat test`
