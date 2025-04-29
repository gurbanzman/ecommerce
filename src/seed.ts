import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      {
        name: "Accounting",
        slug: "accounting",
      },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      {
        name: "Gigs & Side Projects",
        slug: "gigs-side-projects",
      },
      {
        name: "Investing",
        slug: "investing",
      },
      {
        name: "Management & Leadership",
        slug: "management-leadership",
      },
      {
        name: "Networking, Careers & Jobs",
        slug: "networking-careers-jobs",
      },
      {
        name: "Personal Finance",
        slug: "personal-finance",
      },
      {
        name: "Real Estate",
        slug: "real-estate",
      },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      {
        name: "Fiction",
        slug: "fiction",
      },
      {
        name: "Non-Fiction",
        slug: "non-fiction",
      },
      {
        name: "Blogging",
        slug: "blogging",
      },
      {
        name: "Copywriting",
        slug: "copywriting",
      },
      {
        name: "Self-Publishing",
        slug: "self-publishing",
      },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      {
        name: "Web Development",
        slug: "web-development",
      },
      {
        name: "Mobile Development",
        slug: "mobile-development",
      },
      {
        name: "Game Development",
        slug: "game-development",
      },
      {
        name: "Programming Languages",
        slug: "programming-languages",
      },
      {
        name: "Devops",
        slug: "devops",
      },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B30",
    slug: "self-improvement",
    subcategories: [
      {
        name: "Productivity",
        slug: "productivity",
      },
      {
        name: "Mindfulness",
        slug: "mindfulness",
      },
      {
        name: "Career Growth",
        slug: "career-growth",
      },
      {
        name: "Personal Development",
        slug: "personal-development",
      },
    ],
  },
  {
    name: "Health & Fitness",
    color: "#FF9AA2",
    slug: "health-fitness",
    subcategories: [
      {
        name: "Workout Plans",
        slug: "workout-plans",
      },
      {
        name: "Nutrition",
        slug: "nutrition",
      },
      {
        name: "Mental Health",
        slug: "mental-health",
      },
      {
        name: "Yoga",
        slug: "yoga",
      },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      {
        name: "Graphic Design",
        slug: "graphic-design",
      },
      {
        name: "Web Design",
        slug: "web-design",
      },
      {
        name: "Typography",
        slug: "typography",
      },
      {
        name: "UI/UX Design",
        slug: "ui-ux-design",
      },
      {
        name: "3D Modeling",
        slug: "3d-modeling",
      },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcatogories: [
      {
        name: "Music Production",
        slug: "music-production",
      },
      {
        name: "Music Theory",
        slug: "music-theory",
      },
      {
        name: "Songwriting",
        slug: "songwriting",
      },
      {
        name: "Music History",
        slug: "music-history",
      },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seeding completed successfully");

  process.exit(0);
} catch (error) {
  console.error("Error during seeding: ", error);
  process.exit(1); // Exit with error code
}
