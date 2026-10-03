

## Current repair pass — 2026-10-02

- [x] Inspect the current StoryCard JSX/CSS and compare preview versus public deployment; root cause was `scene-sun` overriding the shared image container.
- [x] Fix all story-card image sizing/loading behavior, especially stories 10, 16, 22, and 28.
- [x] Add short review questions under every story while preserving browser narration.
- [ ] Run typecheck/build and production smoke tests for story cards, reader, questions, and image URLs.
- [ ] Deploy the verified change and re-check GitHub Pages and Vercel without claiming an unverified Publish state.
- [ ] Deliver final public links, SEO repository description, and the 100-story expansion master prompt.
