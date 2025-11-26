export type Trainer = {
    id: number;
    name: string;
    locations: string[];
    expertise: string[];
    tier: "Standard" | "Elite" | "Master";
    imageUrl: string;
    yearsExperience: number;
  };
  
  export const trainers: Trainer[] = [
    {
      id: 1,
      name: "Sarah Mitchell",
      locations: ["Canary Wharf", "Soho"],
      expertise: ["Strength", "Boxing"],
      tier: "Elite",
      imageUrl: "https://placehold.co/300x200?text=Sarah",
      yearsExperience: 7,
    },
    {
      id: 2,
      name: "James Parker",
      locations: ["City"],
      expertise: ["Hypertrophy", "Conditioning"],
      tier: "Standard",
      imageUrl: "https://placehold.co/300x200?text=James",
      yearsExperience: 3,
    },
    {
      id: 3,
      name: "Amelia Chen",
      locations: ["Canary Wharf"],
      expertise: ["Boxing", "Mobility"],
      tier: "Master",
      imageUrl: "https://placehold.co/300x200?text=Amelia",
      yearsExperience: 9,
    },
  ];
  