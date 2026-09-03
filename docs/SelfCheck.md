# PolarBear — Self Check

Use this checklist before considering a task complete or pushing major changes to the repository.

---

## 1. Feature Check

* [ ] The requested feature is implemented.
* [ ] The feature works as expected.
* [ ] Existing features still work.
* [ ] No unnecessary features were added.
* [ ] The implementation matches the project's existing structure.

---

## 2. UI Check

* [ ] The design matches the PolarBear visual style.
* [ ] Spacing is consistent.
* [ ] Border radius is consistent.
* [ ] Colors use the existing design system where possible.
* [ ] Text is readable.
* [ ] Buttons have appropriate hover states.
* [ ] Forms provide clear feedback.
* [ ] Empty states are handled where necessary.

---

## 3. Responsive Check

Test the feature on:

* [ ] Desktop
* [ ] Tablet
* [ ] Mobile

Check:

* [ ] No horizontal scrolling
* [ ] No overlapping elements
* [ ] Images scale correctly
* [ ] Text remains readable
* [ ] Buttons remain accessible
* [ ] Navigation works correctly

---

## 4. Functional Check

For the Project Management System:

* [ ] Projects page loads correctly.
* [ ] Project filters work.
* [ ] Professional filter works.
* [ ] Learning filter works.
* [ ] Category filters work.
* [ ] Search works if applicable.
* [ ] Add Project page loads correctly.
* [ ] Project name validation works.
* [ ] Cover image validation works.
* [ ] Technologies can be added.
* [ ] Technologies can be removed.
* [ ] Gallery images can be added.
* [ ] Gallery images can be removed.
* [ ] Case Study fields work.
* [ ] Project can be added successfully.
* [ ] Added project appears on the Projects page.
* [ ] Project details page displays the new project.
* [ ] Project deletion works.
* [ ] localStorage persistence works.

---

## 5. Code Check

* [ ] No unused imports.
* [ ] No undefined variables.
* [ ] No unnecessary duplicated code.
* [ ] TypeScript types are correct.
* [ ] Component responsibilities are clear.
* [ ] Existing components are reused where appropriate.
* [ ] No temporary debugging code remains.
* [ ] No `console.log` statements were left unintentionally.

---

## 6. Runtime Check

Run the development server:

```bash
npm run dev
```

Confirm:

* [ ] No runtime errors.
* [ ] No browser console errors.
* [ ] No broken routes.
* [ ] No missing images.
* [ ] No broken links.

---

## 7. Production Check

Run:

```bash
npm run build
```

Confirm:

* [ ] Build completes successfully.
* [ ] No TypeScript errors.
* [ ] No build errors.
* [ ] No unexpected warnings that affect functionality.

---

## 8. Git Check

Before committing:

```bash
git status
```

Review:

```bash
git diff
```

Confirm:

* [ ] Only intended files are modified.
* [ ] No temporary files are included.
* [ ] No personal/private information is included.
* [ ] No unnecessary generated files are included.
* [ ] Documentation is updated when necessary.

---

## 9. Commit Check

Before pushing:

* [ ] Commit message clearly describes the change.
* [ ] Commit contains only the intended task.
* [ ] The project works after the commit.

Example:

```bash
git add <intended-files>
git commit -m "feat: describe the completed feature"
git push origin main
```

---

## Final Check

Before marking a task as complete, honestly confirm:

* [ ] I understand what I changed.
* [ ] I tested what I changed.
* [ ] I checked the existing functionality.
* [ ] I reviewed the Git diff.
* [ ] I did not commit files that should remain local.
* [ ] The application builds successfully.
* [ ] The task is actually complete.

If any important checkbox is unchecked, the task is not ready to be considered complete.
