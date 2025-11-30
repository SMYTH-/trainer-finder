type TrainerFiltersProps = {
    locations: string[];
    tiers: string[];
    selectedLocation: string;
    selectedTier: string;
    searchTerm: string;
    onLocationChange: (location: string) => void;
    onTierChange: (tier: string) => void;
    onSearchChange: (value: string) => void;
    onClearFilters: () => void;
  };
  
  export function TrainerFilters({
    locations,
    tiers,
    selectedLocation,
    selectedTier,
    searchTerm,
    onLocationChange,
    onTierChange,
    onSearchChange,
    onClearFilters,
  }: TrainerFiltersProps) {
    return (
      <div className="flex flex-col flex-wrap gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="trainer-search"
            className="text-sm font-medium text-slate-700"
          >
            Search:
          </label>
          <input
            id="trainer-search"
            type="text"
            placeholder="Name, expertise, location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full max-w-xs rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm outline-none ring-0 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-300"
          />
        </div>
  
        {/* Location pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600">Filter by location:</span>
          {locations.map((location) => {
            const isActive = location === selectedLocation;
            return (
              <button
                key={location}
                type="button"
                onClick={() => onLocationChange(location)}
                className={[
                  "rounded-full border px-3 py-1 text-sm transition",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-800 hover:border-slate-500",
                ].join(" ")}
              >
                {location}
              </button>
            );
          })}
        </div>
  
        {/* Tier pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600">Filter by tier:</span>
          {tiers.map((tier) => {
            const isActive = tier === selectedTier;
            return (
              <button
                key={tier}
                type="button"
                onClick={() => onTierChange(tier)}
                className={[
                  "rounded-full border px-3 py-1 text-sm transition",
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-800 hover:border-slate-500",
                ].join(" ")}
              >
                {tier}
              </button>
            );
          })}
        </div>
  
        {/* Clear filters */}
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900"
        >
          Clear all filters
        </button>
      </div>
    );
  }
  