// src/api/trainers.ts
import { trainers, type Trainer } from "../data/trainers";

// Fake API call: in a real app this would be fetch("/api/trainers") etc.
export async function fetchTrainers(): Promise<Trainer[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate success response
  return trainers;

  // Later you could add random error simulation, pagination, etc.
}
