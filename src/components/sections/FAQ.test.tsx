import { render, screen, fireEvent } from "@testing-library/react";
import FAQ from "./FAQ";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

function filterDomProps(props: Record<string, unknown>) {
  const domProps: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!["initial", "animate", "transition", "whileInView", "viewport", "exit"].includes(key)) {
      domProps[key] = props[key];
    }
  }
  return domProps;
}

describe("FAQ", () => {
  it("renders all questions", () => {
    render(<FAQ />);
    expect(screen.getByText(/What is backtesting/)).toBeInTheDocument();
    expect(screen.getByText(/How accurate is the historical data/)).toBeInTheDocument();
    expect(screen.getByText(/Which brokers and exchanges/)).toBeInTheDocument();
  });

  it("toggles answer on click", () => {
    render(<FAQ />);
    const question = screen.getByText(/What is backtesting/);
    fireEvent.click(question);
    expect(screen.getByText(/Backtesting is the process/)).toBeInTheDocument();
  });

  it("has aria-expanded on buttons", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded");
    });
  });
});
