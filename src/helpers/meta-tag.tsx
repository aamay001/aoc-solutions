import { ReactNode } from "react";

export const getDayMetaTags = (day: number): ReactNode[] => {
  return [
      <title key="tag-0">{`AoC++ 2024 Solutions | Day ${day}`}</title>,
      <meta  key="tag-1" name="description" content={`Advent of Code (AoC++) 2024 solution and solver for day ${day}.`} />,
      <meta  key="tag-2" property="og:title" content={`AoC++ 2024 Solutions | Day ${day}`} />,
      <meta  key="tag-3" property="og:url" content={`https://aoc-solutions.netlify.app/day/${day}`} />,
      <meta  key="tag-4" property="og:description" content={`Advent of Code (AoC++) 2024 solution and solver for day ${day}.`} />,
      <meta  key="tag-5" property="og:type" content="article" />,
      <meta  key="tag-6" name="twitter:card" content="summary" />,
      <meta  key="tag-7" property="twitter:title" content={`AoC++ 2024 Solutions | Day ${day}`} />,
      <meta  key="tag-8" property="twitter:description" content={`Advent of Code (AoC++) 2024 solution and solver for day ${day}.`} />,
      <meta property={`og:site_name" content="AoC++ 2024 Solutions | Day ${day}`} />
    ];
}

export const getHomeMetaTags = (): ReactNode[] => {
  return [
      <title key="tag-0">AoC++ 2024 Solutions</title>,
      <meta key="tag-1" name="description" content="A web application containing solutions for the Advent of Code 2024." />,
      <meta key="tag-2" property="og:title" content="AoC++ 2024 Solutions" />,
      <meta key="tag-3" property="og:url" content="https://aoc-solutions.netlify.app" />,
      <meta key="tag-4" property="og:description" content="A web application containing solutions for the Advent of Code 2024." />,
      <meta key="tag-5" name="twitter:card" content="summary" />,
      <meta key="tag-6" property="twitter:title" content="A web application containing solutions for the Advent of Code 2024." />,
      <meta key="tag-7" property="twitter:description" content="A web application containing solutions for the Advent of Code 2024." />,
      <meta  key="tag-8" property="og:type" content="website" />,
      <meta property="og:site_name" content="AoC++ 2024 Solutions"/>,
  ];
}

