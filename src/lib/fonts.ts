import { Fraunces, Space_Grotesk } from "next/font/google";

export const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
