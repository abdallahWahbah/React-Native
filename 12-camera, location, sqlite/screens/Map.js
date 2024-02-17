import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

import IconButton from '../components/UI/IconButton';

function Map({navigation, route})
{
    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    useLayoutEffect(()=>
    {
        if(initialLocation) return;

        navigation.setOptions({
            headerRight: (({tintColor}) => (
                <IconButton 
                    iconName="save" 
                    color={tintColor} 
                    size={24} 
                    onPress={savePickedLocationHandler}
                />
            ))
        })
    }, [selectedLocation, initialLocation])

    const selectLocationHandler = event =>
    {
        if(initialLocation) return;
        // console.log(event.nativeEvent.coordinate)
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat, lng})
    }
    
    const savePickedLocationHandler = () =>
    {
        if(!selectedLocation)
        {
            Alert.alert("No location picked", "You have to pick a location (by tapping on the map) first!")
            return;
        }

        navigation.navigate("AddPlace", {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng
        })
    }

    return(
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: initialLocation ? initialLocation.lat : 24.788105406045688, // latitude and longitude: define the center of the map
                longitude: initialLocation ? initialLocation.lng : 46.72859411177947,
                latitudeDelta: 13, // latitudeDelta and longitudeDelta: how much besides the center should be visible
                longitudeDelta: 14
            }}
            showsUserLocation
            showsMyLocationButton // showsMyLocationButton ={true}
            onPress={selectLocationHandler}
        >
            {selectedLocation && (
                <Marker 
                    title="Picked Location"
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            )}

        </MapView>
    )   
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})