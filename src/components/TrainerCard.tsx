import type { Trainer } from "../data/trainers";

type TrainerCardProps = {
  trainer: Trainer;
  onSelect?: () => void;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
};

export function TrainerCard({
  trainer,
  onSelect,
  isFavourite = false,
  onToggleFavourite,
}: TrainerCardProps) {
  return (
    <article
      onClick={onSelect}
      className="flex cursor-pointer gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img
        src={trainer.imageUrl}
        alt={trainer.name}
        className="h-28 w-28 flex-shrink-0 rounded-lg object-cover"
      />
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{trainer.name}</h2>
          <p className="text-sm text-slate-700">
            <span className="font-medium">Locations:</span>{" "}
            {trainer.locations.join(", ")}
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-medium">Expertise:</span>{" "}
            {trainer.expertise.join(", ")}
          </p>
          <p className="text-sm text-slate-700">
            <span className="font-medium">Tier:</span> {trainer.tier} ·{" "}
            <span className="font-medium">Experience:</span>{" "}
            {trainer.yearsExperience} years
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Click card for more details
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering onSelect
              onToggleFavourite?.();
            }}
            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:border-slate-500"
          >
            <span
              className={
                isFavourite ? "mr-1 text-yellow-500" : "mr-1 text-slate-400"
              }
            >
              ★
            </span>
            {isFavourite ? "Favourited" : "Favourite"}
          </button>
        </div>
      </div>
    </article>
  );
}
