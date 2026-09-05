# VividTale deployment checklist

- [x] Authenticate the Vercel CLI with the first user-provided Personal Access Token without writing it into project files.
- [x] Create or reuse a short Vercel project name close to the VividTale story-library topic.
- [x] Deploy the production build from `/home/ubuntu/vividtale-site` to Vercel.
- [x] Verify the public URL returns the VividTale page and the production assets load.
- [x] Verify the story reader opens from the public URL and the browser narration control is present.
- [ ] Revoke the temporary Vercel token; this requires account-side confirmation because the CLI token-management endpoint was not available for the active team scope.
- [ ] Save the final Manus project checkpoint and provide the deploy URL plus the project version to the user.
- [ ] Use the newly supplied Vercel token for account verification; Vercel returned `User not found`, so it was not used for deployment.
- [x] Confirm the existing production alias remains healthy after the account check.

## GitHub and production verification

- [x] Verify the GitHub repository remote, default branch, and tracked application files.
- [x] Confirm the build command and deployment output directory match the React/Vite project.
- [x] Add an SEO-friendly English repository description under 350 characters.
- [x] Test the production build for TypeScript errors, blank-page causes, broken imports, and missing assets.
- [ ] Verify the published URL and story-reader interaction after deployment; Vercel Publish remains pending account-side action.
- [ ] Save a new stable checkpoint with the verification results.

## Missing story illustrations and final validation

- [x] Generate matching illustrations for stories 10, 13, 16, 17, 21, 22, 23, 27, 28, and 29.
- [x] Upload or reference the ten new illustrations without breaking the current storage strategy.
- [x] Verify all 30 story cards have distinct image sources and valid rendered images.
- [x] Re-run TypeScript, production build, preview smoke test, and blank-page checks.
- [ ] Push the updated code and assets mapping to GitHub main; checkpoint is the remaining final step.
