export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 mt-2">
          Manage your restaurant website from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Homepage</h3>
          <p className="mt-2 text-sm text-gray-500">
            Hero, Featured Products, Quote, Branches
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Restaurant</h3>
          <p className="mt-2 text-sm text-gray-500">
            Menu, Story, Locations, Contact
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <h3 className="font-semibold">Settings</h3>
          <p className="mt-2 text-sm text-gray-500">
            Global website settings
          </p>
        </div>
      </div>
    </div>
  );
}