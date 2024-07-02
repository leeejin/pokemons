"use client";
import Page from "@/components/Page";
import Image from "next/image";

import { Pokemon } from "@/types/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GET, TOTAL_POKEMON } from "./api/pokemons/route";

import { useInView } from "react-intersection-observer";
import SpinnerIcon from "../../../images/spinner-icon.gif";

const itemsPerPage = 24;
const totalPages = Math.ceil(TOTAL_POKEMON / itemsPerPage);
export default function HomePage() {
  const router = useRouter();

  const fetchPokemons = async ({ pageParam }: { pageParam: number }) => {
    const start = pageParam * itemsPerPage;
    const end = start + itemsPerPage;
    const response = await GET(new Request(""), start, end);
    const data = await response.json();

    return {
      data,
      nextPage: pageParam + 1,
    };
  };
  const {
    data: pokemons,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
    getNextPageParam: (lastPage) => {
      const { nextPage } = lastPage;
      if (nextPage < totalPages) return nextPage;
      return undefined;
    },
    initialPageParam: 0,
  });

  const { ref } = useInView({
    threshold: 0.9,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Image src={SpinnerIcon} alt="로딩중" width={100} height={100} />
      </div>
    );
  return (
    <Page title="포켓몬 도감">
      <ul className="grid lg:grid-cols-6 md:grid-cols-3 gap-5">
        {pokemons?.pages.flatMap((page) =>
          page.data.map((pokemon: Pokemon) => (
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
          ))
        )}
      </ul>
      {hasNextPage && (
        <div className="text-center m-4" ref={ref}>
          <h3>Loading...</h3>
        </div>
      )}
    </Page>
  );
}
