# Contribution Guidelines (Infrastructure Development Plan)

Thank you for your interest in joining the **Developer Coalition**.
Your contribution will be recorded as a legacy (and portfolio).

## 🏗️ How to Add a New Command

1.  **Create Handler**: Add a new handler function in `lib/handlers.js`.
    *   Use `logger.info`, `logger.warn`, or `logger.box` for output.
    *   Do not use raw `console.log` unless absolutely necessary (e.g. streaming).
2.  **Register Command**: Edit `bin/mulyo` to register the new command using Commander.js.
3.  **Testing**:
    *   Create unit tests in `tests/lib/handlers.test.js`.
    *   Ensure coverage is sufficient (or at least looks green).

## 🧪 Running Tests

To ensure national stability (and code integrity), run:

```bash
npm run test:unit
```

This will execute:
1.  **Unit Tests**: Testing module logic in isolation.
2.  **Integration Tests**: Testing real process spawning (caution: involves real processes).

## 📝 Code Style

- Use **ESLint** and **Prettier**.
- Satirical variable names are highly recommended (e.g., `const budgetLeak`, `function politicalLobby()`).
- Code comments should explain "why", not just "how" (bonus points if the comment is funny).

## 🚀 Pull Request

- Ensure your PR title is bombastic (e.g., "Mega Refactor Project", "Algorithm Downstreaming").
- The PR description must convince us that this change is for the greater good of the people.
- Wait for approval from "Central Command" (Maintainers).

---
*"Work, Work, Work (Typhus)"*
