import type { Trainer } from "../data/trainers";

type TrainerCardProps = {
  trainer: Trainer;
};

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <img
        src={trainer.imageUrl}
        alt={trainer.name}
        className="h-28 w-28 flex-shrink-0 rounded-lg object-cover"
      />
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
    </article>
  );
}
