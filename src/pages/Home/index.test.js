import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { BreedsContext } from "../../utils/contexts";
import Home from "./index";

const breeds = ["first", "second", "third"];

test("renders learn react link", () => {
  render(
    <Router>
      <BreedsContext.Provider value={breeds}>
        <Home />
      </BreedsContext.Provider>
    </Router>
  );

  const liElements = screen.getAllByTestId("item-breed");

  expect(liElements.length).toBe(3);
  expect(liElements[1].textContent).toBe("second");
  expect(liElements[1].href).toMatch(/\/second$/);
});
