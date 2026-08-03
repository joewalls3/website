export function isClerkConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY,
  );
}

export function isOwner(userId: string | null) {
  const ownerUserId = process.env.OWNER_CLERK_USER_ID;
  return Boolean(userId && ownerUserId && userId === ownerUserId);
}
