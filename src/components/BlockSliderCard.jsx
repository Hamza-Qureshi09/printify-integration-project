import { useEffect, useState } from "react";
import Image from "next/image";
import { LockIcon } from "@/components/common/Icons";

const BlockSliderCard = ({ data, extraClasses }) => {
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [words, setWords] = useState([]);

  useEffect(() => {
    const owner = data.token?.owner;

    fetch(`/api/account?publicAddress=${owner}`)
      .then((res) => res.json())
      .then((res) => {
        setUsername(
          res.account?.username || `${owner?.slice(0, 4)}...${owner?.slice(-4)}`
        );
        setOccupation(res.account?.occupation);
        setWords(res.account?.words);
      });
  }, []);

  return (
    <div
      className={`${extraClasses} px-3 relative hover_card_parent w-full h-full`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#100f0dac] flex flex-col justify-center items-center">
        <span>
          <LockIcon />
        </span>
        <div className="w-[91%] absolute start-1/2 -translate-x-1/2 bottom-[28px]">
          <h3 className=" font-extrabold text-sm leading-5 text-center text-white shadow-sm hover_card_text duration-300">
            {username}
          </h3>

          <p className="text-xs text-center">{occupation}</p>

          {/* <div
            className={`${
              words?.length > 0
                ? "w-full flex mt-3 overflow-x-scroll gap-2 px-5 no-scrollbar"
                : ""
            }`}
          >
            {words?.length > 0
              ? words.map((word, index) => {
                  return (
                    <div
                      key={index}
                      className="text-xs w-fit px-3 py-1 rounded-full bg-white text-black font-medium flex items-center gap-1"
                    >
                      <p>{word}</p>
                    </div>
                  );
                })
              : null}
          </div> */}
        </div>
      </div>
      {data.token?.tokenId ? (
        <Image
          className="w-full h-full rounded-2xl"
          width="242"
          height="237"
          // src={data.token?.image}
          src={`https://blocxperts.com/projects/blocky-bites/nfts/images/${
            parseInt(data.token?.tokenId) + 1
          }.png`}
          alt="add card items"
        />
      ) : (
        <Image
          className="w-full h-full aspect-square rounded-2xl"
          width="242"
          height="237"
          src={
            "https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg"
          }
          alt="add card items"
        />
      )}

      {/* {data.token?.metadata?.imageOriginal ? (
        <Image
          className="w-full h-full rounded-2xl"
          width="242"
          height="237"
          src={data.token?.metadata?.imageOriginal.replace(
            "ipfs://",
            "https://nftstorage.link/ipfs/"
          )}
          alt="add card items"
        />
      ) : (
        <Image
          className="w-full h-full aspect-square rounded-2xl"
          width="242"
          height="237"
          src={
            "https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg"
          }
          alt="add card items"
        />
      )} */}
    </div>
  );
};

export default BlockSliderCard;
