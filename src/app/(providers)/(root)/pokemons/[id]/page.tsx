import Badge from "@/components/Badge";
import Image from "next/image";
import { GET } from "../../api/pokemons/[id]/route";

interface DetailPageProps {
  params: { id: string };
}
async function DetailPage({ params }: DetailPageProps) {
  const response = await GET(
    new Request(`https://pokeapi.co/api/v2/pokemon/${params.id}`),
    params.id
  );
  const pokemon = await response.json();
  return (
    <div>
      <div className="bg-gray-100 rounded-t-md p-2">
        <h1 className="text-3xl">{pokemon.korean_name}</h1>
        <h4>No.{pokemon.id.toString().padStart(4, "0")}</h4>
      </div>
      <div className="p-2">
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.korean_name || pokemon.name}
          width={200}
          height={200}
          className="object-cover m-auto"
        />
        <h4>이름: {pokemon.korean_name}</h4>
        <h4>
          키: {pokemon.height}m, 무게:{pokemon.weight} kg
        </h4>
        <div className="flex flex-row gap-1 justify-center">
          타입:
          {pokemon.types.map((type: any, index: number) => (
            <Badge key={index} title={type.type.korean_name} intent="orange" />
          ))}
          특성:
          {pokemon.abilities.map((ability: any, index: number) => (
            <Badge
              key={index}
              title={ability.ability.korean_name}
              intent="green"
            />
          ))}
        </div>

        <h4>기술:</h4>
        <div className="flex flex-row gap-1 justify-center flex-wrap">
          {pokemon.moves.map((move: any, index: number) => (
            <Badge key={index} title={move.move.korean_name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
