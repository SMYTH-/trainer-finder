import type { Trainer } from "../data/trainers";

type TrainerDetailPanelProps = {
  trainer: Trainer | null;
  onClose: () => void;
};

export function TrainerDetailPanel({
  trainer,
  onClose,
}: TrainerDetailPanelProps) {
  // If nothing selected, render nothing
  if (!trainer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        className="pointer-events-auto h-full flex-1 bg-black/40"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="pointer-events-auto flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-200 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h2 className="text-lg font-semibold">{trainer.name}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:border-slate-500"
          >
            Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          <div className="flex gap-4">
            <img
              src={trainer.imageUrl}
              alt={trainer.name}
              className="h-32 w-32 flex-shrink-0 rounded-lg object-cover"
            />
            <div className="space-y-1 text-sm text-slate-700">
              <p>
                <span className="font-medium">Tier:</span> {trainer.tier}
              </p>
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {trainer.yearsExperience} years
              </p>
              <p>
                <span className="font-medium">Locations:</span>{" "}
                {trainer.locations.join(", ")}
              </p>
            </div>
          </div>

          <div className="space-y-1 text-sm text-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-1">
              {trainer.expertise.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-800"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Placeholder for future content */}
          <div className="space-y-1 text-sm text-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              About
            </h3>
            <p className="text-sm text-slate-700">
              This is placeholder copy. Later we can pull in a bio, pricing,
              availability, and contact actions to make this feel like a real
              product detail view.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
