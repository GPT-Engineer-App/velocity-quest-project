import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Cat, Info } from 'lucide-react';

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  if (isLoading) return <Skeleton className="h-[100px] w-full" />;
  if (error) return <p>Error loading cat fact</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Cat Fact
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{data.fact}</p>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <Cat className="h-8 w-8" />
          All About Cats
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Domestic Cat</CardTitle>
              <CardDescription>Felis catus</CardDescription>
            </CardHeader>
            <CardContent>
              <img src="https://placekitten.com/400/300" alt="Cute cat" className="w-full h-48 object-cover rounded-md mb-4" />
              <p>The domestic cat is a small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the housecat when kept as an indoor pet.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cat Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Retractable claws</li>
                <li>Excellent night vision</li>
                <li>Flexible body and quick reflexes</li>
                <li>Independent nature</li>
                <li>Variety of vocalizations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {['Playful', 'Curious', 'Agile', 'Affectionate', 'Mysterious', 'Intelligent'].map((trait) => (
            <Badge key={trait} variant="secondary" className="text-center py-2">{trait}</Badge>
          ))}
        </div>
        
        <CatFactCard />
      </div>
    </div>
  );
};

export default Index;