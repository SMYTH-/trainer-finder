import { useMemo, useState } from "react";
import { trainers, type Trainer } from "../data/trainers";
import { TrainerCard } from "./TrainerCard";
import { TrainerFilters } from "./TrainerFilters";
import { TrainerDetailPanel } from "./TrainerDetailPanel";

const ALL_LOCATIONS_LABEL = "All locations";
const ALL_TIERS_LABEL = "All tiers";

function computeFilteredTrainers(
  allTrainers: Trainer[],
  selectedLocation: string,
  selectedTier: string,
  searchTerm: string
): Trainer[] {
  const term = searchTerm.trim().toLowerCase();

  return allTrainers.filter((trainer) => {
    const matchesLocation =
      selectedLocation === ALL_LOCATIONS_LABEL ||
      trainer.locations.includes(selectedLocation);

    const matchesTier =
      selectedTier === ALL_TIERS_LABEL || trainer.tier === selectedTier;

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
}

export function TrainerList() {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    ALL_LOCATIONS_LABEL
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>(ALL_TIERS_LABEL);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

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

  // Compute filtered trainers based on the selected filters and search term
  const filteredTrainers = useMemo(
    () =>
      computeFilteredTrainers(
        trainers,
        selectedLocation,
        selectedTier,
        searchTerm
      ),
    [selectedLocation, selectedTier, searchTerm]
  );
  

  function handleClearFilters() {
    setSelectedLocation(ALL_LOCATIONS_LABEL);
    setSelectedTier(ALL_TIERS_LABEL);
    setSearchTerm("");
  }
  
  // Handle trainer selection
  // Show trainer details in a panel
  function handleSelectTrainer(trainer: Trainer) {
    setSelectedTrainer(trainer);
  }
  
  function handleClosePanel() {
    setSelectedTrainer(null);
  }
  

  return (

    <section className="space-y-4">
      <TrainerFilters
        locations={locations}
        tiers={tiers}
        selectedLocation={selectedLocation}
        selectedTier={selectedTier}
        searchTerm={searchTerm}
        onLocationChange={setSelectedLocation}
        onTierChange={setSelectedTier}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
      />

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
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              onSelect={() => handleSelectTrainer(trainer)}
            />
          ))}
        </div>
      )}

      <TrainerDetailPanel trainer={selectedTrainer} onClose={handleClosePanel} />
    </section>
  );
}
