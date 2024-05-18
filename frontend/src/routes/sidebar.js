import React from "react";
/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import {
  CircleStackIcon,
  StarIcon,
  CogIcon,
  ServerStackIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: <CircleStackIcon className="h-6" />, // the component being exported from icons/index.js
    name: "Home", // name that appear in Sidebar
  },
  {
    path: "/app/subscribe",
    icon: <StarIcon className="h-6" />,
    name: "Subscribe",
   },

  {
    path: "/app/storage",
    icon: <ServerStackIcon className="h-6" />,
    name: " Storage",
  },
  {
    path: "/app/community",
    icon: <UserGroupIcon className="h-6" />,
    name: "Community",
  },
  {
    path: "/app/chat",
    icon: <ChatBubbleLeftRightIcon className="h-6" />,
    name: "Chat",
  },
  // {
  //   path: "/app/nft",
  //   icon: <SparklesIcon className="h-6" />,
  //   name: "NFT",
  // },
 
  {
    path: "/app/setting",
    icon: <CogIcon className="h-6" />,
    name: "Setting",
  },

  // {
  //   path: "/app/tables",
  //   icon: "TablesIcon",
  //   name: "Tables",
  // },
];

export default routes;
