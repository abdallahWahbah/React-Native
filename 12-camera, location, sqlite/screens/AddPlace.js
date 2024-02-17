import { Text } from "react-native";

import PlaceForm from "../components/Places/PlaceForm";
import {insertPlaceSQLITE} from '../util/database'

function AddPlace({navigation})
{
    const createPlaceHandler = async (place) =>
    {
        await insertPlaceSQLITE(place);
        navigation.navigate("AllPlaces")
    }

    return(
        <PlaceForm onCreatePlace={createPlaceHandler}/>
    )   
}

export default AddPlace;