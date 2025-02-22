export function Dropdown({
  isOpen,
  highlightedIndex,
  guessedOblast,
  filteredSuggestions,
  getItemProps,
  getMenuProps,
}) {
  return (
    <div
      id="locationDropdown"
      role="listbox"
      className="rounded w-full max-h-52 overflow-x-hidden absolute z-50 top-full bg-gray-300"
      {...getMenuProps()}
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <ul role="listbox">
        {filteredSuggestions.map((suggestion, index) => {
          return (
            <li
              key={index}
              {...getItemProps({
                index,
                item: suggestion,
                className: `m-0.5 p-1 flex hover:bg-gray-300 cursor-pointer ${
                  highlightedIndex === index ? "bg-gray-300" : "bg-white"
                }`,
              })}
            >
              <span>
                <strong>
                  {suggestion.slice(0, guessedOblast.length).toUpperCase()}
                </strong>
                {suggestion.slice(guessedOblast.length).toUpperCase()}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
