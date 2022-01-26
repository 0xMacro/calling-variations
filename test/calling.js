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

  it("calling doStuff1 should update data to 7", async function () {
    await calling.doStuff1()
    expect(await calling.data()).to.equal(7)
  })

  it("calling doStuff2 should cause us to revert", async function () {
    await expect(calling.doStuff2()).to.be.revertedWith("Uh oh!")
  })

  it("call doStuff3 should update data to 7", async function () {
    await calling.doStuff3();
    expect(await calling.data()).to.equal(7)
  })

  it("call doStuff4 should skip the update of data, leaving it at 5", async function () {
    await calling.doStuff4();
    expect(await calling.data()).to.equal(5)
  })

  it("call doStuff5 should update data with 5, the value it already had", async function () {
    await calling.doStuff5();
    expect(await calling.data()).to.equal(5)
  })

})
