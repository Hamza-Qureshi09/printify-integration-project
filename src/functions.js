import {
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from "@wagmi/core";
import { toast } from "react-toastify";
import { smartContract, whitelist } from "./config";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { fromHex } from "viem";

export const whitelistSaleMint = async (
  setIsDisabled,
  address,
  quantity,
  setTokenIds
) => {
  setIsDisabled(true);

  if (whitelist.indexOf(address) != -1) {
    try {
      const whitelistSaleMintPrice = await readContract({
        chainId: 5,
        address: smartContract.address,
        abi: smartContract.abi,
        functionName: "whitelistSaleMintPrice",
      });

      const leaves = whitelist.map((x) => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const buf2hex = (x) => "0x" + x.toString("hex");

      const leaf = keccak256(address);
      const proof = tree.getProof(leaf).map((x) => buf2hex(x.data));

      const { request } = await prepareWriteContract({
        address: smartContract.address,
        abi: smartContract.abi,
        functionName: "whitelistSaleMint",
        args: [quantity, proof],
        value: `${parseInt(whitelistSaleMintPrice) * quantity}`,
      });

      const { hash } = await writeContract(request);

      const data = await waitForTransaction({ hash });

      const tokenIds = [];

      data.logs.forEach((log) => {
        tokenIds.push(fromHex(log.topics[3], "number"));
      });

      setTokenIds(tokenIds);

      setIsDisabled(false);

      toast.success("Minted successfully");
    } catch (err) {
      setIsDisabled(false);

      let errObj = JSON.parse(
        JSON.stringify(err, Object.getOwnPropertyNames(err))
      );

      if (err.shortMessage.includes("reason:")) {
        const splittedMsg = err.shortMessage.split("reason:\n");

        toast.error(splittedMsg[1] || "Something went wrong");
      } else {
        toast.error(errObj.shortMessage || "Something went wrong");
      }
    }
  } else {
    setIsDisabled(false);

    toast.error("Not whitelisted");
  }
};

export const publicSaleMint = async (
  setIsDisabled,
  address,
  quantity,
  setTokenIds
) => {
  setIsDisabled(true);

  try {
    const publicSaleMintPrice = await readContract({
      chainId: 5,
      address: smartContract.address,
      abi: smartContract.abi,
      functionName: "publicSaleMintPrice",
    });

    const { request } = await prepareWriteContract({
      address: smartContract.address,
      abi: smartContract.abi,
      functionName: "publicSaleMint",
      args: [quantity],
      value: `${parseInt(publicSaleMintPrice) * quantity}`,
    });

    const { hash } = await writeContract(request);

    const data = await waitForTransaction({ hash });

    const tokenIds = [];

    data.logs.forEach((log) => {
      tokenIds.push(fromHex(log.topics[3], "number"));
    });

    setTokenIds(tokenIds);

    setIsDisabled(false);

    toast.success("Minted successfully");
  } catch (err) {
    setIsDisabled(false);

    let errObj = JSON.parse(
      JSON.stringify(err, Object.getOwnPropertyNames(err))
    );

    if (err.shortMessage.includes("reason:")) {
      const splittedMsg = err.shortMessage.split("reason:\n");

      toast.error(splittedMsg[1] || "Something went wrong");
    } else {
      toast.error(errObj.shortMessage || "Something went wrong");
    }
  }
};
