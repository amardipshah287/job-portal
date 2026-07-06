export default function CategoryCard({ category }) {
  const Icon = category.icon;
  return (
    <div className="h-full">
      <div className="p-6">
        <div className="flex items-start">
          <div className={`${category.bgColor} p-3 rounded-full mr-4`}>
            <Icon className={`w-6 h-6 ${category.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{category.title}</h3>
            <p className="mb-4">{category.jobs} Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
