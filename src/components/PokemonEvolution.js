import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
function PokemonEvolution({ url }) {
  const [pokemonEvo, setPokemonEvo] = useState({
    evoChains: [],
  });

  useEffect(() => {
    async function fetchPokemonEvolution() {
      const res = await axios.get(url);
      let evoChains = [];
      await axios.get(res.data.evolution_chain.url).then((response) => {
        let evolve = response.data.chain;
        do {
          let evoDetails = evolve.evolution_details[0];
          evoChains.push({
            species_name: evolve.species.name,
            species_url:
              evolve.species.url.split("/")[
                evolve.species.url.split("/").length - 2
              ],
            min_level: !evoDetails ? 1 : evoDetails.min_level,
            trigger_name: !evoDetails ? null : evoDetails.trigger.name,
            item: !evoDetails ? null : evoDetails.item,
            extra: false,
          });
          evolve = evolve.evolves_to[0];
        } while (!!evolve && evolve.hasOwnProperty("evolves_to"));
        setPokemonEvo({
          evoChains,
        });
      });
    }
    fetchPokemonEvolution();
  }, [url]);

  return (
    <div className="card-body">
      <h5 className="card-title text-center">Evolution Information</h5>
      <div className="d-flex mx-auto justify-content-around">
        {pokemonEvo.evoChains.map((chain) => (
          <Fragment key={chain.species_name}>
            {
              <Fragment>
                <div>
                  <img
                    className="card-img-top rounded mx-auto mt-2"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species_url}.png`}
                    alt={chain.species_name}
                  />
                  <h5 className="card-title">
                    {chain.species_name
                      .toLowerCase()
                      .split(" ")
                      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(" ")}
                  </h5>
                </div>
              </Fragment>
            }
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default PokemonEvolution;
