const duplicateProjectIds = new Set([
  "prj_ihVnIFnBdM5Wig1uL0fVzPCtWPC2",
]);

const duplicateProductionHosts = new Set([
  "joe-walls-website.vercel.app",
  "joe-walls-website-joesamwalls-8683s-projects.vercel.app",
  "joe-walls-website-joesamwalls-8683-joesamwalls-8683s-projects.vercel.app",
]);

const projectId = process.env.VERCEL_PROJECT_ID ?? "";
const productionHost = (
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""
).toLowerCase();

const isDuplicateProject =
  duplicateProjectIds.has(projectId) ||
  duplicateProductionHosts.has(productionHost);

if (isDuplicateProject) {
  console.log(
    `Skipping duplicate Vercel project: ${projectId || productionHost}`,
  );
  process.exit(0);
}

console.log(
  `Allowing Vercel deployment for: ${projectId || productionHost || "unknown project"}`,
);
process.exit(1);
