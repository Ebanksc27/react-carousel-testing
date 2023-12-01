import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", () => {
  // Render the Card component with mock props
  render(<Card caption="Test Caption" src="test.jpg" currNum={1} totalNum={3} />);
  // If no errors are thrown during rendering, the test will pass
});
