type Props = {
  params: {
    id: string;
  };
};

export default function RecipeDetailsPage({ params }: Props) {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Recipe Details</h1>
      <p className="mt-4">Recipe ID: {params.id}</p>
    </div>
  );
}