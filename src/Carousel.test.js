import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // Move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("moves to the previous image when the left arrow is clicked", function() {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);

  // Move forward to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Click the left arrow to move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show again
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();
});

it("hides the left arrow when on the first image", function() {
  const { queryByTestId } = render(<Carousel photos={TEST_IMAGES} />);
  expect(queryByTestId("left-arrow")).toBeNull();
});

it("hides the right arrow when on the last image", function() {
  const { queryByTestId, getByTestId } = render(<Carousel photos={TEST_IMAGES} />);
  
  // Assuming TEST_IMAGES has more than one image, click the right arrow until the end
  const rightArrow = getByTestId("right-arrow");
  for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
    fireEvent.click(rightArrow);
  }

  expect(queryByTestId("right-arrow")).toBeNull();
});
