import Footer from "@/components/Footer";
import Header from "@/components/common/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackToTop from "@/components/common/BackToTop";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import Preloader from "@/components/common/Preloader";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Account() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [username, setUsername] = useState("");
  const [occupation, setOccupation] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [bio, setBio] = useState("");
  const [newWord, setNewWord] = useState("");
  const [words, setWords] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [router, isConnected]);

  useEffect(() => {
    if (address) {
      fetch(`/api/account?publicAddress=${address.toLowerCase()}`, {
        cache: "no-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.account) {
            setUsername(res.account?.username || "");
            setOccupation(res.account?.occupation || "");
            setInstagramLink(res.account?.instagramLink || "");
            setTwitterLink(res.account?.twitterLink || "");
            setBio(res.account?.bio || "");
            setWords(res.account?.words || []);
          } else {
            setUsername("");
          }
        });
    }
  }, [address]);

  const handleSaveChangesBtnClick = () => {
    setIsDisabled(true);

    if (username.length >= 3) {
      const regex = /^[a-z0-9_.]+$/;

      if (regex.test(username)) {
        if (
          instagramLink.length > 0 &&
          !instagramLink.includes("instagram.com")
        ) {
          setIsDisabled(false);

          toast.error("Please enter a valid instagram link");

          return;
        }

        if (twitterLink.length > 0 && !twitterLink.includes("twitter.com")) {
          setIsDisabled(false);

          toast.error("Please enter a valid twitter link");

          return;
        }

        fetch(`/api/account?username=${username}`, {
          cache: "no-cache",
        })
          .then((res) => res.json())
          .then((res) => {
            if (
              res.account === null ||
              res.account?.publicAddress === address.toLowerCase()
            ) {
              fetch("/api/account", {
                method: "POST",
                body: JSON.stringify({
                  publicAddress: address.toLowerCase(),
                  username,
                  occupation,
                  instagramLink,
                  twitterLink,
                  bio,
                  words,
                }),
              }).then(() => {
                setIsDisabled(false);

                toast.success("Saved successfully");
              });
            } else {
              setIsDisabled(false);

              toast.error("Username already taken");
            }
          });
      } else {
        setIsDisabled(false);

        toast.error(
          "Username can only contain (a-z), (0-9), underscore and period"
        );
      }
    } else {
      setIsDisabled(false);

      toast.error("Username must be at least 3 characters long");
    }
  };

  const handleAddNewWordBtnClick = () => {
    if (newWord.length > 0) {
      if (words.length < 5) {
        const regex = /^[A-z]+$/;

        if (regex.test(newWord)) {
          setWords((prevWords) => [...prevWords, newWord]);

          setNewWord("");
        } else {
          toast.error("Make sure there is no space or comma");
        }
      } else {
        toast.error("You cannot add more than 5 words");
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* {videoEnd ? ( */}
      <>
        <Header />

        <div className="min-h-[65vh] pt-[82px]">
          <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 flex flex-col items-center">
            <h1
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-delay="300"
              className="pt-14 text-[28px] leading-[33.6px] sm:leading-[45px] sm:text-[40px] md:text-[42px] xl:text-2xl lg:leading-[60px] font-extrabold text-center mb-[40px] md:mb-[53px] aos-init aos-animate"
            >
              MY ACCOUNT
            </h1>

            <div className="mb-8 w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">
                Enter your username
              </label>

              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="block w-full border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
              />
            </div>

            <div className="mb-8 w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">
                Occupation
              </label>

              <input
                value={occupation}
                onChange={(e) => {
                  setOccupation(e.target.value);
                }}
                type="text"
                className="block w-full border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
              />
            </div>

            <div className="mb-8 w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">
                Instagram link
              </label>

              <input
                value={instagramLink}
                onChange={(e) => {
                  setInstagramLink(e.target.value);
                }}
                type="text"
                className="block w-full border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
              />
            </div>

            <div className="mb-8 w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">
                Twitter link
              </label>

              <input
                value={twitterLink}
                onChange={(e) => {
                  setTwitterLink(e.target.value);
                }}
                type="text"
                className="block w-full border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
              />
            </div>

            <div className="mb-8 w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">Bio</label>

              <input
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                type="text"
                maxLength={150}
                className="block w-full border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
              />
            </div>

            {/* <div className="w-full  max-w-[450px] ">
              <label className="text-xs mb-3 block text-white/70">
                Input any 5 words to be displayed on “The Block (only for NFT
                Owners)”:
              </label>

              <div className="flex gap-2">
                <input
                  value={newWord}
                  onChange={(e) => {
                    setNewWord(e.target.value);
                  }}
                  type="text"
                  className="block flex-1 border border-[#FFFFFF29] rounded-[5px] p-3 px-4 bg-transparent outline-none placeholder:text-white/70"
                />

                <button
                  onClick={handleAddNewWordBtnClick}
                  className="p-3 rounded-[5px] px-5 bg-[#FFBB00] text-black uppercase font-bold text-sm hover:bg-transparent hover:text-[#FFBB00] duration-300 border-[1px] border-[#FFBB00]"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {words.map((word, index) => {
                  return (
                    <div
                      key={index}
                      className="w-fit px-4 py-2 rounded-full bg-white/10 flex items-center gap-1"
                    >
                      <p>{word}</p>
                      <button
                        onClick={() => {
                          const newWords = [...words];

                          newWords.splice(index, 1);

                          setWords(newWords);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 transition hover:text-gray-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div> */}

            <button
              onClick={handleSaveChangesBtnClick}
              className={`uppercase text-xs xl:text-sm font-bold bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] h-[56px] w-[192px] bg-no-repeat duration-300 text-black flex justify-center items-center  mt-4 bg_size_full ${
                isDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {isDisabled ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <Footer />
        <BackToTop />
      </>
      {/* ) : ( */}
      <Preloader />
      {/* <Preloader setVideoEnd={setVideoEnd} videoEnd={videoEnd} /> */}
      {/* )} */}
    </div>
  );
}
