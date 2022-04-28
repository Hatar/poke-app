import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function Views() {
  const [pokemons, setPokemons] = useState([]);
  const [error, setErrors] = useState("");
  const params = useParams();
  const pokemonUrl = `https://pokeapi.co/api/v2/type/${params.type}`;
  useEffect(() => {
    async function getPokemonOfTypes() {
      try {
        await axios.get(pokemonUrl).then((res) => {
          setPokemons(res.data.pokemon);
        });
      } catch (error) {
        setErrors(error);
      }
    }
    getPokemonOfTypes();
  }, [params.type]);
  return (
    <div>
      <h3 className="text-center d-block">
        List of pokemons belonging to the selected type
      </h3>
      <div className="row">
        {!error ? (
          pokemons.map((pokemon, idx) => (
            <ul className="list-group col-md-3 col-xs-12">
              <Link
                to={`/types/${pokemon.pokemon.name}`}
                className="list-group-item mb-2 bg-primary text-white text-center"
                key={idx}
              >
                {pokemon.pokemon.name}
              </Link>
            </ul>
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
    </div>
  );
}

export default Views;
