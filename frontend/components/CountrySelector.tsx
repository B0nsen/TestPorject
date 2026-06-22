import { countryOptions, DEFAULT_COUNTRY } from "@/lib/utils/countries";
import { useMemo, useState } from "react";

type CountrySelectProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};
export default function CountrySelect({
  value,
  onChange,
  error,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const getFlagUrl = (code: string) =>
    `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

  const selected = useMemo(() => {
    return (
      countryOptions.find((c) => c.value === value) ||
      countryOptions.find((c) => c.value === DEFAULT_COUNTRY) ||
      countryOptions[0]
    );
  }, [value]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countryOptions;

    return countryOptions.filter((c) =>
      c.label.toLowerCase().startsWith(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="relative w-full text-input">
      <div className="w-full h-[40px] bg-input-surface-default flex items-center rounded-[10px]">
        <button
          type="button"
          className="h-full flex items-center pl-[15px] gap-[6px] flex-1 cursor-pointer"
          onClick={() => {
            setOpen(true);
            setIsSearching(true);
            setSearch("");
          }}
        >
          <img
            src={getFlagUrl(selected.value)}
            alt={selected.label}
            className="w-[30px] h-[16px] object-cover rounded-[2px] mr-[3px] shrink-0"
          />
          {!isSearching && (
            <span className="text-[13px]">{selected.label}</span>
          )}
          {isSearching && (
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                setIsSearching(false);
                setSearch("");
              }}
              className="text-[13px] outline-none w-full"
              placeholder="Search country"
            />
          )}
        </button>
        <button
          type="button"
          className="h-full flex items-center pr-[15px] cursor-pointer"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-[13px]">▾</span>
        </button>
      </div>
      {open && (
        <div className="absolute left-0 top-[44px] w-full z-50 max-h-[220px] overflow-y-auto no-scrollbar bg-input-surface-default rounded-[10px] shadow-md">
          {filteredCountries.map((c) => (
            <button
              key={c.value}
              type="button"
              className="w-full text-left px-[12px] py-[10px] hover:bg-surface-accent-muted text-[13px] cursor-pointer"
              onMouseDown={() => {
                onChange(c.value);
                setOpen(false);
                setIsSearching(false);
                setSearch("");
              }}
            >
              {c.label}
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <div className="px-[12px] py-[10px] text-[12px] opacity-60">
              No matches
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-[12px] mt-[6px]">{error}</div>
      )}
    </div>
  );
}