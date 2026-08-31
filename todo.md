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
