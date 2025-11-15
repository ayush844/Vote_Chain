import hre from "hardhat";

async function main() {
  const Create = await hre.ethers.getContractFactory("Create");
  console.log("📦 Deploying Create contract...");

  const create = await Create.deploy();

  await create.waitForDeployment();

  console.log(`✅ Contract deployed to: ${create.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
