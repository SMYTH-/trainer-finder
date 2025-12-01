import { useMemo, useState, useEffect } from "react";
import type { Trainer } from "../data/trainers";
import { fetchTrainers } from "../api/trainers";
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
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<string>(
    ALL_LOCATIONS_LABEL
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>(ALL_TIERS_LABEL);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  // Track favourite trainer IDs
  const [favouriteTrainerIds, setFavouriteTrainerIds] = useState<number[]>([]);
  const favouriteCount = favouriteTrainerIds.length;

  const tiers = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((trainer) => {
      set.add(trainer.tier);
    });
    return [ALL_TIERS_LABEL, ...Array.from(set)];
  }, [trainers]);

  // Derive unique locations from the data
  const locations = useMemo(() => {
    const set = new Set<string>();
    trainers.forEach((trainer) => {
      trainer.locations.forEach((loc) => set.add(loc));
    });
    return [ALL_LOCATIONS_LABEL, ...Array.from(set)];
  }, [trainers]);

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

  useEffect(() => {
    let isCancelled = false;

    async function loadTrainers() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchTrainers();
        if (!isCancelled) {
          setTrainers(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to load trainers. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    loadTrainers();

    return () => {
      isCancelled = true;
    };
  }, []);


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

  function handleToggleFavourite(trainerId: number) {
    setFavouriteTrainerIds((prevIds) =>
      prevIds.includes(trainerId)
        ? prevIds.filter((id) => id !== trainerId)
        : [...prevIds, trainerId]
    );
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
      <h1 className="text-xl font-semibold">
        Available Trainers
        {favouriteTrainerIds.length > 0 && (
          <span className="ml-2 text-sm font-normal text-slate-500">
            · {favouriteTrainerIds.length} favourite
            {favouriteTrainerIds.length > 1 ? "s" : ""}
          </span>
      )}</h1>

      {/* Loading / Error / Empty / Results */}
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading trainers…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : filteredTrainers.length === 0 ? (
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
              isFavourite={favouriteTrainerIds.includes(trainer.id)}
              onToggleFavourite={() => handleToggleFavourite(trainer.id)}
            />
          ))}
        </div>
      )}


      <TrainerDetailPanel trainer={selectedTrainer} onClose={handleClosePanel} />
    </section>
  );
}
