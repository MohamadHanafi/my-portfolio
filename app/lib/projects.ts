export type ProjectAction = {
  label: string;
  href: string;
  icon?: "external" | "play";
  iconPosition?: "left" | "right";
  openInNewTab?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  primaryAction?: ProjectAction;
  secondaryAction?: ProjectAction;
  color?: "rose" | "blue" | "green" | "yellow" | "purple";
  featured?: boolean;
  tags?: string[];
};

export const projects: Project[] = [
  {
    slug: "taxsi",
    title: "Taxsi — Smart Mobility, Seamlessly Connected.",
    description:
      "Taxsi is a ride-booking ecosystem that connects passengers, drivers, and administrators through one intelligent platform. It includes Customer and Driver mobile apps, a responsive landing page, and an Admin Panel for managing users, rides, payments, analytics, and real-time operations.",
    imageSrc: "/project_taxsi.jpg",
    imageAlt: "Taxsi smart mobility platform preview",
    primaryAction: {
      label: "Visit Taxsi",
      href: "https://taxsiride.com/#contact",
      icon: "external",
      iconPosition: "right",
      openInNewTab: true,
    },
    color: "yellow",
    featured: true,
    tags: ["Mobility", "Flutter", "Admin Panel", "Landing Page"],
  },
  {
    slug: "lutfen",
    title: "Lutfen",
    description:
      "LÜTFEN is a modern e-commerce platform for medical and dental supplies, designed to provide healthcare professionals with a fast, reliable, and user-friendly shopping experience. The platform includes a mobile app and website featuring product browsing, rewards, wishlist functionality, and streamlined ordering for medical equipment and dental tools.",
    imageSrc: "/project_lutfen.jpg",
    imageAlt: "Lutfen project preview",
    primaryAction: {
      label: "Visit Lutfen",
      href: "https://lutfen.co",
      icon: "external",
      iconPosition: "right",
      openInNewTab: true,
    },
    color: "rose",
    tags: ["Platform", "UI/UX", "Web App"],
  },
  {
    slug: "viago",
    title: "ViaGå — Premium Supplements for Peak Performance",
    description:
      "ViaGå is a modern e-commerce platform focused on premium performance supplements designed to support energy, endurance, and everyday performance. The project combines a sleek shopping experience with a strong brand identity, allowing customers to explore scientifically formulated products, learn about ingredient benefits, and purchase supplements through a fast, responsive, and user-friendly platform built for modern wellness consumers.",
    imageSrc: "/project_viago.jpg",
    imageAlt: "ViaGå premium supplements e-commerce platform preview",
    primaryAction: {
      label: "Visit ViaGå",
      href: "https://viago1.netlify.app",
      icon: "external",
      iconPosition: "right",
      openInNewTab: true,
    },
    color: "green",
    tags: ["E-commerce", "Wellness", "Supplements", "Branding"],
  },
];
