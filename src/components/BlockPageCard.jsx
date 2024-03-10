import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, TwitterIcon } from "./common/Icons";

const BlockPageCard = ({ data, tokenOwner, extraClasses }) => {
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [bio, setBio] = useState("");
  const [words, setWords] = useState([]);

  useEffect(() => {
    const owner = data.token?.owner || tokenOwner;

    fetch(`/api/account?publicAddress=${owner}`)
      .then((res) => res.json())
      .then((res) => {
        setUsername(
          res.account?.username || `${owner?.slice(0, 4)}...${owner?.slice(-4)}`
        );
        setOccupation(res.account?.occupation || "");
        setInstagramLink(res.account?.instagramLink || "");
        setTwitterLink(res.account?.twitterLink || "");
        setBio(res.account?.bio || "");
        setWords(res.account?.words);
      });
  }, []);

  return (
    <div
      class={`flip_card relative w-full aspect-square bg-transparent ${extraClasses}`}
    >
      <div className="flip_card_trigger absolute top-3 right-3 z-20 w-[25px] h-[25px] bg-black/20 rounded-full flex justify-center items-center cursor-pointer">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="flip_card_inner relative w-full h-full ">
        <div class="flip_card_front absolute w-full h-full rounded-2xl overflow-hidden">
          <div className="absolute top-0 left-0 z-10 w-full h-full p-5 bg-gradient-to-b from-transparent to-black/90 flex flex-col justify-end">
            <h3 className="font-bold text-center">{username}</h3>

            <p className="mb-3 text-xs text-center">{occupation}</p>

            <div className="flex justify-center gap-2">
              {instagramLink && (
                <Link
                  href={instagramLink}
                  target="_blank"
                  className="duration-300 hover:translate-y-[-6px]"
                >
                  <InstagramIcon />
                </Link>
              )}

              {twitterLink && (
                <Link
                  href={twitterLink}
                  target="_blank"
                  className="duration-300 hover:translate-y-[-6px]"
                >
                  <TwitterIcon />
                </Link>
              )}
            </div>
          </div>

          {data.token?.tokenId ? (
            <Image
              src={`https://blocxperts.com/projects/blocky-bites/nfts/images/${
                parseInt(data.token?.tokenId) + 1
              }.png`}
              alt=""
              fill={true}
              className="bg-cover"
            />
          ) : (
            <Image
              src="https://t4.ftcdn.net/jpg/03/78/40/11/360_F_378401105_9LAka9cRxk5Ey2wwanxrLTFCN1U51DL0.jpg"
              alt=""
              fill={true}
              className="bg-cover"
            />
          )}
        </div>

        <div class="flip_card_back absolute w-full h-full p-5 bg-[#FFFFFF08] rounded-lg flex flex-col justify-between overflow-hidden">
          <div className="w-full">
            <h3 className="font-bold text-center text-[#FFBB00]">{username}</h3>

            <p className="mb-3 text-xs text-center">{occupation}</p>

            <p className="mb-3 text-xs text-center text-white/70">{bio}</p>
          </div>

          {/* <div className="w-full flex mt-3 overflow-x-scroll gap-2 no-scrollbar">
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
    </div>
  );
};

export default BlockPageCard;
