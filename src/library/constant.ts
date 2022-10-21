export const DEFAULT_AVATAR = "/default-avatar.png";

export const IMAGE_PROXY = (url: string) =>
  `https://apoqrsgtqq.cloudimg.io/${url}`;

export const REACTIONS_UI: {
  [key: string]: {
    icon: string;
    gif: string;
  };
} = {
  Like: {
    icon: "/public/reactions-icon/like.svg",
    gif: "/public/reactions/like.gif",
  },
  Love: {
    icon: "/public/reactions-icon/love.svg",
    gif: "/public/reactions/love.gif",
  },
  Care: {
    icon: "/public/reactions-icon/care.svg",
    gif: "/public/reactions/care.gif",
  },
  Haha: {
    icon: "/public/reactions-icon/haha.svg",
    gif: "/public/reactions/haha.gif",
  },
  Wow: {
    icon: "/public/reactions-icon/wow.svg",
    gif: "/public/reactions/wow.gif",
  },
  Sad: {
    icon: "/public/reactions-icon/sad.svg",
    gif: "/public/reactions/sad.gif",
  },
  Angry: {
    icon: "/public/reactions-icon/angry.svg",
    gif: "/public/reactions/angry.gif",
  },
};
