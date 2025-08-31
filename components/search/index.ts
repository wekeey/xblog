// Main search components
export { default as SearchDialog } from "./dialog";
export { SearchProvider, useSearch } from "./provider";
export { SearchTrigger } from "./trigger";

// Subcomponents
export { HistoryGroup } from "./history-group";
export { ResultsGroup } from "./results-group";
export { LoadingView, ErrorView, EmptyView } from "./status-views";
export { default as HighlightedContent } from "./highlighted-content";

// Utilities and types
export * from "./types";
export * from "./utils";
export * from "./icons";
