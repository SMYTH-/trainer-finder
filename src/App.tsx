import { TrainerList } from "./components/TrainerList";

function App() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 font-sans">
        <header className="mb-8">
          <h1 className="mb-1 text-3xl font-semibold tracking-tight">
            Trainer Finder
          </h1>
          <p className="text-slate-600">
            Prototype
          </p>
        </header>

        <TrainerList />
      </div>
    </main>
  );
}

export default App;
