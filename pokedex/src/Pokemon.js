import React, { useEffect, useState } from 'react';
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUppercase } from './constants'
import axios from 'axios'



const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined)

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data)
            })
            .catch(function (err) {
                setPokemon(false);
            });
    }, [pokemonId]);

    const genPokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        return (
            <div>
                <Typography variant='h1'>
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                <Typography variant="h3">Pokemon info</Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>Poids:{weight}</Typography>
                <Typography>Taille:{height}</Typography>
                <Typography variant='h6'>Types:</Typography>
                {
                    types.map((typeInfo) => {
                        const { type } = typeInfo;
                        const { name } = type;
                        return <Typography key={name}>{`${name}`}</Typography>
                    })
                }
            </div>
        )
    }

    return (
        <div>

            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && genPokemonJSX()}
            {pokemon === false && <Typography>Pokemon non trouvé</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    cherches encore!
                </Button>
            )}
        </div>
    )
}

export default Pokemon