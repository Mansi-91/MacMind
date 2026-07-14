function StatCard({ title, value }) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-800 w-56">
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;