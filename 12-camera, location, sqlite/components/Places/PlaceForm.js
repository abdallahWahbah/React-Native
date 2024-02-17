import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from '../UI/Button';
import { Place } from "../../models/place";

function PlaceForm({onCreatePlace})
{
    const [enteredTitle, setEnteredTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    const savePlaceHandler = () =>
    {
        // console.log(enteredTitle, selectedImage, pickedLocation)
        const placeData = new Place(enteredTitle, selectedImage, pickedLocation)
        onCreatePlace(placeData)
    }

    return(
        <ScrollView style={sytles.form}>
            <View>
                <Text style={sytles.label}>Title</Text>
                <TextInput 
                    style={sytles.input}
                    value={enteredTitle}
                    onChangeText={enteredText => setEnteredTitle(enteredText)}
                />
            </View>
            <ImagePicker onTakeImage={(imageUri) => setSelectedImage(imageUri)} />
            <LocationPicker onPickLocation={(location) => setPickedLocation(location)}/>
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    )   
}

export default PlaceForm;

const sytles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    }
})