import { Contract, ContractTransaction, ethers } from "ethers";
import yargs from "yargs";
import RollupAdminFacetABI from "../abi/rollupAdminFacet";
import { ethProvider } from "../networks";
import { printEventLog } from "../printer";

async function main() {
  const { rollup: rollupAddress, validators } = yargs
    .option("rollup", {
      alias: "r",
      description: "Rollup address",
      type: "string",
      demandOption: true,
    })
    .option("validators", {
      alias: "v",
      description: "Validator addresses separated by comma 0x01,0x02",
      type: "string",
      demandOption: true,
    })
    .help()
    .alias("help", "h").argv as {
    rollup: string;
    validators: string;
  };
  const validatorAddresses = validators.split(",");
  const rollup = new Contract(
    rollupAddress,
    // "0x2b39D5E8b1EFE16Fdb8ceD47c004733e345f4256",
    RollupAdminFacetABI,
    ethProvider.getSigner(0)
  );
  const tx = (await rollup.setValidator(
    validatorAddresses,
    Array(validatorAddresses.length).fill(true)
    // ["0x1ebf2843a5be0cc40d1f401e24ebfd6f2d6f2238"],
    // [true]
  )) as ContractTransaction;
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events || []).map(printEventLog));
}

main().then(() => {
  process.exit(0);
});
