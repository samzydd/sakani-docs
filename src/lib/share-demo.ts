import type { SharePerson } from "@sakaniui/react/blocks";

/** The people the Share block's demos know: type one of these addresses and it becomes a name and a photo. */
export const SHARE_DIRECTORY: SharePerson[] = [
  { email: "chloe.wu@acme.com", name: "Chloe Wu", avatarSrc: "/blocks/avatars/share-chloe-wu.jpg" },
  { email: "marco.diaz@acme.com", name: "Marco Diaz", avatarSrc: "/blocks/avatars/share-marco-diaz.jpg" },
];

/** What every Share demo on the site passes besides its own behaviour. */
export const SHARE_DEMO = {
  subtitle: "Enterprise roadmap · Note 453",
  owner: { name: "Amara Okafor", avatarSrc: "/blocks/avatars/share-owner.jpg" },
  link: "https://acme.com/enterprise/note/453",
  directory: SHARE_DIRECTORY,
};
