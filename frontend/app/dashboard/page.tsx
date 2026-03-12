import PageHeader from "@/components/ui/PageHeader"
import QuickActionCard from "@/components/dashboard/QuickActionCard"
import StatsCard from "@/components/dashboard/StatsCard"
import RecentRecipes from "@/components/dashboard/RecentRecipes"
import { Recipe } from "@/types/Recipe"

export default function DashboardPage() {
  const recentRecipes: Recipe[] = []
  return (
    <div className="p-6 space-y-8">

      <PageHeader
        title="Dashboard"
        subtitle="Manage your pantry and generate recipes"
      />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <QuickActionCard
          title="Scan Ingredients"
          description="Upload a photo to detect ingredients"
          href="/scan"
        />

        <QuickActionCard
          title="View Pantry"
          description="Manage ingredients in your kitchen"
          href="/pantry"
        />

        <QuickActionCard
          title="Generate Recipes"
          description="Create recipes from pantry ingredients"
          href="/recipes"
        />

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatsCard title="Pantry Items" value={0} />

        <StatsCard title="Recipes Generated" value={0} />

        <StatsCard title="Saved Recipes" value={0} />

      </div>

      {/* Recent Recipes */}
      <div>
        <RecentRecipes recipes={recentRecipes} />
      </div>

    </div>
  )
}