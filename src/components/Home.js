import React, { Fragment, useEffect, useState } from "react";
import { Card, Pagination, FilterField } from "../components";
function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setErrors] = useState("");
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const fetchPokemons = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          const data = await res.json();

          setPokemons((currentList) => [...currentList, data]);
          await pokemons.sort((a, b) => a.id - b.id);
        } catch (error) {
          setErrors(error);
        }
      });
    }
    createPokemonObject(data.results);
  };

  const filterPokemon = (event) => {
    const search = event.target.value;
    let cloneDataPokemon = pokemons;
    let resultFilter = null;
    if (search !== "") {
      resultFilter = pokemons.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
      resultFilter.length > 0
        ? setPokemons(resultFilter)
        : setErrors("Something Wrong !!!");
    } else {
      setErrors("");
      setPokemons(cloneDataPokemon);
    }
  };

  const switchToNextPage = () => {
    setPokemons([]);
    setUrl(nextUrl);
  };
  const switchToPrevPage = () => {
    setPokemons([]);
    setUrl(prevUrl);
  };

  useEffect(() => {
    fetchPokemons();
  }, [url]);
  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <div className="col-4">
          <FilterField handleFilter={filterPokemon} />
        </div>
        <div>
          <Pagination
            prevUrl={prevUrl}
            switchToNextPage={switchToNextPage}
            switchToPrevPage={switchToPrevPage}
          />
        </div>
      </div>
      <div className="row row -flex">
        {!error ? (
          pokemons.map((item, idx) => (
            <div className="col-md-4 col-sm-6 col-xs-12">
              <>
                <Card
                  key={idx}
                  id={item.id}
                  image={item.sprites.other.dream_world.front_default}
                  title={item.name}
                  type={item.types[0].type.name}
                />
              </>
            </div>
          ))
        ) : (
          <div
            className="alert alert-danger mx-2 my-3 text-center p-2"
            role="alert"
          >
            <h4>{error}</h4>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Home;
