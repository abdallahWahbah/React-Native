import { Text } from "react-native";
import { useEffect, useState } from "react";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlacesSQLITE } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({route})
{
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(()=>
    {
        const loadPlaces = async () =>
        {
            const places = await fetchPlacesSQLITE();
            setLoadedPlaces(places)
        }
        if(isFocused)
        {
            loadPlaces();
            // setLoadedPlaces(currentPlaces => [...currentPlaces, route.params.place])
        }
    }, [isFocused])
    return(
        <PlacesList places={loadedPlaces} />
    )   
}

export default AllPlaces;