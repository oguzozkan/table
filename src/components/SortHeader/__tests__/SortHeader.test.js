import React from "react";
import { render, screen, within } from "@testing-library/react";
import SortHeader from "../SortHeader.js";

describe("SortHeader", () => {
  // Test case: Returns undefined for non-sortable headers
  it("returns undefined for non-sortable headers", () => {
    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: false }]}
          requestSort={() => {}}
          sortConfig={null}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });

    // Assert that the CSS class is empty for non-sortable headers
    expect(headerCell.className).toBe("");

    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for non-sortable headers
    expect(icon).toHaveClass("bi-dash");
  });

  // Test case: Returns undefined for headers with no sortConfig
  it("returns undefined for headers with no sortConfig", () => {
    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={null}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });

    // Assert that the CSS class is empty for headers with no sortConfig
    expect(headerCell.className).toBe("");

    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for headers with no sortConfig
    expect(icon).toHaveClass("bi-dash");
  });

  // Test case: Returns the correct class name for headers with sortConfig
  it("returns the correct class name for headers with sortConfig", () => {
    const sortConfig = {
      key: "columnName",
      direction: "ascending",
    };

    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={sortConfig}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });

    // Assert that the CSS class is "ascending" for headers with ascending sortConfig
    expect(headerCell.className).toBe("ascending");
  });

  // Test case: Renders the chevron-up icon for headers with descending sortConfig
  it("renders the chevron-up icon for headers with descending sortConfig", () => {
    const sortConfig = {
      key: "columnName",
      direction: "descending",
    };

    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={sortConfig}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });
    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for descending sortConfig
    expect(icon).toHaveClass("bi-chevron-compact-up");
  });
  it("renders the chevron-down icon for headers with ascending sortConfig", () => {
    const sortConfig = {
      key: "columnName",
      direction: "ascending",
    };

    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={sortConfig}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });
    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for ascending sortConfig
    expect(icon).toHaveClass("bi-chevron-compact-down");
  });

  // Test case: Renders the dash icon for headers with no sortConfig and not currently sorted
  it("renders the dash icon for headers with no sortConfig and not currently sorted", () => {
    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={null}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });
    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for no sortConfig
    expect(icon).toHaveClass("bi-dash");
  });

  // Test case: Renders the dash icon for headers with no sortConfig and currently sorted
  it("renders the dash icon for headers with no sortConfig and currently sorted", () => {
    const sortConfig = {
      key: "columnName",
      direction: "ascending",
    };

    render(
      <table>
        <SortHeader
          headers={[{ name: "columnName", sortable: true }]}
          requestSort={() => {}}
          sortConfig={sortConfig}
        />
      </table>,
    );

    const headerCell = screen.getByRole("columnheader", {
      name: /columnName/i,
    });
    const icon = within(headerCell).getByTestId("icon");

    // Assert that the icon has the correct class for no sortConfig
    expect(icon).toHaveClass("bi bi-chevron-compact-down");
  });
});
