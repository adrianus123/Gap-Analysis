import { render } from "@testing-library/react";
import LoginPage from "../pages/LoginPage";

test("should first", () => {
  expect(true).toBe(true);
});

test('Render login page', () => { 
    render(<LoginPage />)
    expect(true).toBeTruthy();
 })
