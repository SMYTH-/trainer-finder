import { useMemo, useState } from "react";
import { trainers } from "../data/trainers";
import { TrainerCard } from "./TrainerCard";

const ALL_LOCATIONS_LABEL = "All locations";
const ALL_TIERS_LABEL = "All tiers";

export function TrainerList() {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    ALL_LOCATIONS_LABEL
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>(ALL_TIERS_LABEL);

  const tiers = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((trainer) => {
      set.add(trainer.tier);
    });
    return [ALL_TIERS_LABEL, ...Array.from(set)];
  }, []);

  // Derive unique locations from the data
  const locations = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((trainer) => {
      trainer.locations.forEach((loc) => set.add(loc));
    });
    return [ALL_LOCATIONS_LABEL, ...Array.from(set)];
  }, []);

  // Combine location + search filtering in one place
  const filteredTrainers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return trainers.filter((trainer) => {
      const matchesLocation =
        selectedLocation === ALL_LOCATIONS_LABEL ||
        trainer.locations.includes(selectedLocation);

      const matchesTier =
        selectedTier === ALL_TIERS_LABEL ||
        trainer.tier === selectedTier;

      if (!matchesLocation || !matchesTier) return false;

      if (!term) return true;

      const haystack = [
        trainer.name,
        ...trainer.expertise,
        ...trainer.locations,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [selectedLocation, selectedTier, searchTerm]);

  return (
    <section className="space-y-4">
      {/* Filters row */}
      <div className="flex flex-col gap-3 flex-wrap md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2">
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
            onChange={(e) => setSearchTerm(e.target.value)}
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
                onClick={() => setSelectedLocation(location)}
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
              <button key={tier} type="button" onClick={() => setSelectedTier(tier)} className={[
                "rounded-full border px-3 py-1 text-sm transition",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:border-slate-500",
              ].join(" ")}>
                {tier}
              </button>
            );
          })}
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-semibold">Available Trainers</h1>

      {/* Results */}
      {filteredTrainers.length === 0 ? (
        <p className="italic text-slate-500">
          No trainers match this filter. Try adjusting your search or location.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTrainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      )}
    </section>
  );
}
