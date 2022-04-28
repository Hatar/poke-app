import React, { useEffect, useState, useMemo, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { PokemonStat, PokemonData, PokemonEvolution } from "../components";
function Types() {
  const search = useParams();
  const [pokemonsDetail, setPokeMonDetail] = useState({
    name: "",
    imageUrl: "",
    types: [],
    stats: {
      hp: "",
      attack: "",
      defence: "",
      speed: "",
      specialAttack: "",
      specialDefence: "",
    },
    height: "",
    weight: "",
    abilities: "",
    evs: "",
    url: "",
  });
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${search.pokemonId}`;
  useEffect(() => {
    async function fetchPokemonDetail() {
      await axios.get(pokemonUrl).then((res) => {
        let { hp, attack, defence, speed, specialAttack, specialDefence } = "";
        res.data.stats.map((stat) => {
          switch (stat.stat.name) {
            case "hp":
              hp = stat["base_stat"];
              break;
            case "attack":
              attack = stat["base_stat"];
              break;
            case "defense":
              defence = stat["base_stat"];
              break;
            case "speed":
              speed = stat["base_stat"];
              break;
            case "special-attack":
              specialAttack = stat["base_stat"];
              break;
            case "special-defense":
              specialDefence = stat["base_stat"];
              break;
            default:
              return null;
          }
        });
        const height =
          Math.round((res.data.height * 0.328084 + 0.00001) * 100) / 100;
        const weight =
          Math.round((res.data.weight * 0.220462 + 0.00001) * 100) / 100;
        const types = res.data.types.map((type) => type.type.name);
        const abilities = res.data.abilities
          .map((ability) => {
            return ability.ability.name
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ");
          })
          .join(", ");
        const evs = res.data.stats
          .filter((stat) => {
            if (stat.effort > 0) {
              return true;
            }
            return false;
          })
          .map((stat) => {
            return `${stat.effort} ${stat.stat.name
              .toLowerCase()
              .split("-")
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}`;
          })
          .join(", ");
        const url = res.data.species.url;
        setPokeMonDetail({
          name: res.data.name,
          imageUrl: res.data.sprites.front_default,
          types,
          stats: {
            hp,
            attack,
            defence,
            speed,
            specialAttack,
            specialDefence,
          },
          height,
          weight,
          abilities,
          evs,
          url,
        });
      });
    }

    fetchPokemonDetail();
  }, [search.pokemonId]);
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <div className="">
              <h5>{search.pokemonId}</h5>
            </div>
            <div className="">
              <div className="float-right">
                <span>
                  Types :{" "}
                  {pokemonsDetail.types.map((type) => (
                    <Link
                      to={`/views/${type}`}
                      key={type}
                      className="badge badge-primary text-danger badge-pill mr-1 text-decoration-none"
                    >
                      {type
                        .toLowerCase()
                        .split("-")
                        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" ")}
                    </Link>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
        {useMemo(
          () => (
            <Fragment>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <PokemonStat pokemon={pokemonsDetail} />
                </div>
                <div className="col-md-6 col-xs-12">
                  <PokemonData url={pokemonsDetail.url} />
                </div>
              </div>

              <hr />
              <PokemonEvolution url={pokemonsDetail.url} />
            </Fragment>
          ),
          [pokemonsDetail]
        )}
      </div>
    </div>
  );
}

export default Types;
