import { Html, Head, Main, NextScript } from "next/document";

export default function CustomDocument() {
  return (
    <Html className="scroll-smooth" lang="en">
      <Head>
        {/* <title>Metaverse with Blocky Bites</title> */}
        <meta name="title" content="Metaverse with Blocky Bites" />
        <meta
          name="description"
          content="As a Blocky Bite owner, you are a pioneer of the metaverse. Blocky Bites doesn’t settle for mediocrity…we pave the way for interconnected digital and physical worlds. This is the future…so we’re paving a path to empower owners by providing them an NFT which functions as a ticket to enter physical dimensions via owner-only merchandise, in-game video game characters, coupons and discounts, in-person events, a database of owners…for owners, and…well…more to come."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blocky-bites.vercel.app/" />
        <meta property="og:title" content="Metaverse with Blocky Bites" />
        <meta
          property="og:description"
          content="As a Blocky Bite owner, you are a pioneer of the metaverse. Blocky Bites doesn’t settle for mediocrity…we pave the way for interconnected digital and physical worlds. This is the future…so we’re paving a path to empower owners by providing them an NFT which functions as a ticket to enter physical dimensions via owner-only merchandise, in-game video game characters, coupons and discounts, in-person events, a database of owners…for owners, and…well…more to come."
        />
        <meta
          property="og:image"
          content="https://blocky-bites.vercel.app/meta-img.webp"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://blocky-bites.vercel.app/"
        />
        <meta property="twitter:title" content="Metaverse with Blocky Bites" />
        <meta
          property="twitter:description"
          content="As a Blocky Bite owner, you are a pioneer of the metaverse. Blocky Bites doesn’t settle for mediocrity…we pave the way for interconnected digital and physical worlds. This is the future…so we’re paving a path to empower owners by providing them an NFT which functions as a ticket to enter physical dimensions via owner-only merchandise, in-game video game characters, coupons and discounts, in-person events, a database of owners…for owners, and…well…more to come."
        />
        <meta
          property="twitter:image"
          content="https://blocky-bites.vercel.app/meta-img.webp"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
