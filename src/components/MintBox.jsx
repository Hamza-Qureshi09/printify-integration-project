import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { whitelistSaleMint, publicSaleMint } from "@/functions";
import MintedModal from "@/components/MintedModal";

const MintBox = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [isDisabled, setIsDisabled] = useState(false);
  const [tokenIds, setTokenIds] = useState([]);

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);

  return (
    <>
      <MintedModal
        show={tokenIds.length > 0}
        tokenIds={tokenIds}
        setTokenIds={setTokenIds}
      />

      <div className="mb-4 w-full max-w-[420px] p-6 border-[10px] border-[#FFBB0008] rounded-3xl flex flex-col items-center">
        <div className="mb-8 w-full flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="text-center sm:text-left">
            <p className="font-medium uppercase text-white">Mint Price</p>
            <h3 className="font-medium uppercase text-white">⦿ 0.0015</h3>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
              className="w-[25px] h-[25px] border-2 border-[#FFBB00] bg-[#FFBB00] hover:bg-transparent rounded-full font-bold text-black hover:text-[#FFBB00] transition duration-primary"
            >
              <span className="mt-[-2px] block">-</span>
            </button>

            <div className="text-center">
              <p className="font-medium uppercase text-white">Quantity</p>
              <h3 className="font-medium uppercase text-white">{quantity} ⦿</h3>
            </div>

            <button
              onClick={() => {
                if (quantity < 5) {
                  setQuantity(quantity + 1);
                }
              }}
              className="w-[25px] h-[25px] border-2 border-[#FFBB00] bg-[#FFBB00] hover:bg-transparent rounded-full font-bold text-black hover:text-[#FFBB00] transition duration-primary"
            >
              <span className="mt-[-2px] block">+</span>
            </button>
          </div>
        </div>

        {isWalletConnected ? (
          <button
            onClick={() => {
              setTokenIds([]);

              publicSaleMint(setIsDisabled, address, quantity, setTokenIds);
            }}
            className={`uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full ${
              isDisabled ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {isDisabled ? "Minting..." : "Mint"}
          </button>
        ) : (
          <button
            onClick={() => {
              open();
            }}
            className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </>
  );
};

export default MintBox;
