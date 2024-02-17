import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";

import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage})
{
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermission = async () => // to give permission dialog for IOS phones, cause it doesn't open automatically like android heros
    {   
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED)// we don't know if we have permission or not
        {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted; // true if the permission is granted, else otherwise
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED)
        {
            Alert.alert("Insufficient Permission", "You need to give camera permissions to use this app");
            return false;
        }

        return true; // if the permission is not UNDEFIENED or DENIED >>> then we have acces to it, so return true
    }

    const takeImageHandler = async () =>
    {
        const hasPermission = await verifyPermission();
        if(!hasPermission) return;

        // only this code for android
        const image = await launchCameraAsync({
            allowsEditing: true,
            // aspect: [16, 9],
            quality: .5
        });
        // console.log(image)

        setPickedImage(image.assets[0].uri)
        onTakeImage(image.assets[0].uri)
    }


    return (
        <View>
            <View style={styles.imagePreview}>
                {pickedImage && <Image style={styles.image} source={{uri: pickedImage}}/>}
                {!pickedImage && <Text>No image taken yet!</Text>}
            </View>
            <OutlinedButton onPress={takeImageHandler} iconName="camera">Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%",
        // borderRadius: 4,
    }
})