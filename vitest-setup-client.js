/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />
vi.mock('$env/static/public', () => ({
    PUBLIC_API_URL: process.env.PUBLIC_API_URL || "http://localhost:3000"
}));
