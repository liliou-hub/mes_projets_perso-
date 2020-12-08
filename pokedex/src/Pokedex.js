import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    CardMedia,
    Typography,
    TextField
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import { toFirstCharUppercase } from './constants';
import axios from 'axios';



const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px',

    },

    CardMedia: {
        margin: "auto"
    },

    CardContent: {
        textAlign: "center"
    },

    searchContainer: {
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },

    searchIcon: {
        alignSelf: 'flex-end',
        marginBottom: '5px'
    },

    searchInput: {
        width: '200px',
        margin: '5px',
    }

}));


const Pokedex = (props) => {
    const { history } = props
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
                            }.png`
                    };
                });
                setPokemonData(newPokemonData)
            });

    }, []);


    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]);
        const { id, name, sprite } = pokemonData[pokemonId]

        return (

            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.CardMedia}
                        image={sprite}
                        style={{ width: '130px', height: '130px' }}
                    />
                    <CardContent>
                        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.SearchIcon} />
                        <TextField
                            onChange={handleSearchChange}
                            className={classes.searchInput}
                            label='Trouves ton pokemon!'
                            variant='standard' />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (

                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {
                        Object.keys(pokemonData).map(
                            (pokemonId) =>
                                pokemonData[pokemonId].name.includes(filter) &&
                                getPokemonCard(pokemonId))
                    }
                </Grid>
            ) : (
                    <CircularProgress />
                )}
        </div>

    )
}

export default Pokedex