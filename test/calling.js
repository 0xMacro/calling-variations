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

  it("regular call in doStuff1 should update data to 7", async function () {
    await calling.doStuff1()
    expect(await calling.data()).to.equal(7)
  })

  it("call abi encoded in doStuff2 should update data to 7", async function () {
    await calling.doStuff2();
    expect(await calling.data()).to.equal(7)
  })

  it("delegate call in doStuff3 should update data with 5, the value it already had", async function () {
    await calling.doStuff3();
    expect(await calling.data()).to.equal(5)
  })

  it("regular call in doStuff4 should cause us to revert, leaving data as 5", async function () {
    await expect(calling.doStuff4()).to.be.revertedWith("Uh oh!")
    expect(await calling.data()).to.equal(5)
  })

  it("call abi encoded in doStuff5 should fail in the nested call, then set data to 0", async function () {
    await calling.doStuff5();
    expect(await calling.data()).to.equal(0)
  })

  it("delegate call in doStuff6 should update data with 5, the value it already had", async function () {
    await calling.doStuff6();
    expect(await calling.data()).to.equal(5)
  })

})
