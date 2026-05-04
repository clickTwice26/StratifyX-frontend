import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...filterDomProps(props)}>{children}</div>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <h1 {...filterDomProps(props)}>{children}</h1>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <p {...filterDomProps(props)}>{children}</p>
    ),
    header: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <header {...filterDomProps(props)}>{children}</header>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
  useMotionValue: () => ({ set: jest.fn(), get: jest.fn() }),
  animate: jest.fn(),
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

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero />);
    expect(screen.getByText(/Test Before/)).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Hero />);
    expect(screen.getByText("Start for Free")).toBeInTheDocument();
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders trust stats", () => {
    render(<Hero />);
    expect(screen.getByText(/4,200\+ traders/)).toBeInTheDocument();
    expect(screen.getByText(/12M\+ backtests/)).toBeInTheDocument();
    expect(screen.getByText(/99\.97% uptime/)).toBeInTheDocument();
  });

  it("renders the eyebrow badge", () => {
    render(<Hero />);
    expect(screen.getByText("Now in Open Beta")).toBeInTheDocument();
  });
});
