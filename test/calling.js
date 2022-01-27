const { expect } = require("chai")

describe("Calling contract", function () {

  let calling
  let called
  
  beforeEach(async function () {
    CalledFactory = await ethers.getContractFactory("Called")
    CallingFactory = await ethers.getContractFactory("Calling")
    called = await CalledFactory.deploy();
    await called.deployed();
    calling = await CallingFactory.deploy(called.address)
    await calling.deployed()
  })

  it("castThenCallOk should update data to 7", async function () {
    await calling.castThenCallOk()
    expect(await calling.data()).to.equal(7)
  })

  it("abiEncodeThenCallOk should update data to 7", async function () {
    await calling.abiEncodeThenCallOk();
    expect(await calling.data()).to.equal(7)
  })

  it("delegatecallOk should update data with 5, the value it already had", async function () {
    await calling.delegatecallOk();
    expect(await calling.data()).to.equal(5)
  })

  it("castThenCallMaybe should cause us to revert, leaving data as 5", async function () {
    await expect(calling.castThenCallMaybe()).to.be.revertedWith("Uh oh!")
    expect(await calling.data()).to.equal(5)
  })

  it("abiEncodeThenCallMaybe should fail in the nested call, then set data to 0", async function () {
    await calling.abiEncodeThenCallMaybe();
    expect(await calling.data()).to.equal(0)
  })

  it("delegatecallMaybe should update data with 5, the value it already had", async function () {
    await calling.delegatecallMaybe();
    expect(await calling.data()).to.equal(5)
  })

})
