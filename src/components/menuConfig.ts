export function useMenu() {
  const productMenu = [
    {
      nameKey: "header.AISwap",
      url: "/pages/swap/index",
    },
    {
      nameKey: "header.MovieBricks",
      url: "/pages/movieBricks/index",
    },
    {
      nameKey: "header.PledgedFinancial",
      url: "/pages/pledgedFinancial/index",
    }
  ];

  const centerMenu = [
    {
      nameKey: "header.Airdrop",
      url: "/pages/airdrop/index",
    },
    {
      nameKey: "header.Loan",
      url: "/pages/loan/index",
    },
    {
      nameKey: "header.Activity",
      url: "/pages/activity/index",
    },
    {
      nameKey: "header.Announcement",
      url: "/pages/announcement/index",
    },
  ]

  return { productMenu, centerMenu };
}