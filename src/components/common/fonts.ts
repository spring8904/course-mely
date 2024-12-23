import localFont from "next/font/local";

const manropeFont = localFont({
  src: [
    {
      path: "../../app/fonts/Manrope-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../app/fonts/Manrope-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../app/fonts/Manrope-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../app/fonts/Manrope-ExtraBold.ttf",
      weight: "800",
    },
    {
      path: "../../app/fonts/Manrope-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../app/fonts/Manrope-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../app/fonts/Manrope-Light.ttf",
      weight: "300",
    },
  ],
});

export { manropeFont };
