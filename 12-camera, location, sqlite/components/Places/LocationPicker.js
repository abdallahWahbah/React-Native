import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

function LocationPicker({onPickLocation})
{
    const [pickedLocation, setPickedLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused(); // if the current screen is focused or not,  will be true when we return from the map, and false when we go to the map
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(()=>
    {
        if(route.params)
        {
            const mapPickedLocation = // if we are coming from the map (component)
            {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            }
            
            setPickedLocation(mapPickedLocation)
        }
    }, [route])
    useEffect(()=>
    {   
        onPickLocation({...pickedLocation, address: "you must make API request to get a Human readable address, no google API_KEY"})
    }, [pickedLocation])

    const verifyPermission = async () =>
    {
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED)
        {
            const permissionResponse = requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInformation.status === PermissionStatus.DENIED)
        {
            Alert.alert("Insufficient Permission", "You need to give location permissions to use this app");
            return false;
        }
        return true;
    }

    const getLocationHandler = async () =>
    {
        const hasPermission = await verifyPermission();
        if(!hasPermission) return;

        const location = await getCurrentPositionAsync();
        // console.log(location)
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }

    let locationPreview = <Text> No location picked yet.</Text>;
    if(pickedLocation) locationPreview = (
        <MapView 
            style={styles.image}
            showsUserLocation
            showsMyLocationButton // showsMyLocationButton ={true}
            region={{ // Using a MapView while ((controlling the region as state))
                latitude: pickedLocation.lat, // latitude and longitude: define the center of the map
                longitude: pickedLocation.lng,
                latitudeDelta: 0.0922, // latitudeDelta and longitudeDelta: how much besides the center should be visible
                longitudeDelta: 0.0421
            }}    
            // onRegionChangeComplete={(data) => console.log(data)}
        // />
        >
            <Marker 
                coordinate={{
                    latitude: pickedLocation.lat,
                    longitude: pickedLocation.lng
                }}
            />
        </MapView>
    )

    return(
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
                
            </View>

            <View style={styles.actions}>
                <OutlinedButton iconName="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton iconName="map" onPress={() => navigation.navigate("Map")}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        // borderRadius: 4,
    }
})