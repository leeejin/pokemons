"use client";
import Page from "@/components/Page";
import Image from "next/image";

import { Pokemon } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GET } from "./api/pokemons/route";

export default function HomePage() {
  const router = useRouter();

  const { data: pokemons, isLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await GET(new Request(""));
      const data = await response.json();
      return data;
    },
  });

  return (
    <Page title="포켓몬 도감">
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <ul className="grid lg:grid-cols-6 md:grid-cols-3 gap-5">
          {pokemons?.map((pokemon: Pokemon) => (
            <li
              className="border rounded p-3 hover:cursor-pointer hover:border-2 transition"
              key={pokemon.id}
              onClick={() => {
                router.push(`/pokemons/${pokemon.id}`);
              }}
            >
              <div className="relative aspect-square">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.korean_name || pokemon.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h5>{pokemon.korean_name || pokemon.name}</h5>
              <p>노선번호: {pokemon.id}</p>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
