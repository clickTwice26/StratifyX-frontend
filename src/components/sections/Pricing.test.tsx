import { render, screen, fireEvent } from "@testing-library/react";
import Pricing from "./Pricing";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <span {...filterDomProps(props)}>{children}</span>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

function filterDomProps(props: Record<string, unknown>) {
  const domProps: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!["initial", "animate", "transition", "whileInView", "viewport", "exit", "mode"].includes(key)) {
      domProps[key] = props[key];
    }
  }
  return domProps;
}

describe("Pricing", () => {
  it("renders all tiers", () => {
    render(<Pricing />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Institutional")).toBeInTheDocument();
  });

  it("renders monthly prices by default", () => {
    render(<Pricing />);
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
  });

  it("toggles to annual pricing", () => {
    render(<Pricing />);
    const annualBtn = screen.getByText(/Annually/);
    fireEvent.click(annualBtn);
    expect(screen.getByText("$39")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Pricing />);
    expect(screen.getByText("Get Started Free")).toBeInTheDocument();
    expect(screen.getByText("Start 14-Day Trial")).toBeInTheDocument();
    expect(screen.getByText("Contact Sales")).toBeInTheDocument();
  });

  it("has aria-pressed on toggle buttons", () => {
    render(<Pricing />);
    const monthlyBtn = screen.getByText("Monthly");
    const annualBtn = screen.getByText(/Annually/);
    expect(monthlyBtn).toHaveAttribute("aria-pressed", "true");
    expect(annualBtn).toHaveAttribute("aria-pressed", "false");
  });
});
