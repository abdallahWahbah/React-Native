import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { carouselData } from "./util/dummy-data";
import { Colors } from "./util/colors";
import { useRef } from "react";

const SimpleCarousel = () =>
{
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const {width} = Dimensions.get("window");

    const handleScroll = (event) =>
    {
        Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false}
        )(event)
    }

    const handleItemChanged = useRef(({viewableItems}) => {
        // console.log(viewableItems);
        setIndex(viewableItems[0].index)
    }).current;
console.log(index)

    return (
        <View style={styles.carousel}>
            <FlatList 
                data={carouselData}
                keyExtractor={item => item.id}
                renderItem={(itemData) => (
                    <View style={styles.carouselItem}>
                        <Text style={styles.carouselNumber}>{itemData.item.someNumber}</Text>
                        <Text style={styles.carouselTitle}>{itemData.item.title}</Text>
                    </View>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                onViewableItemsChanged={handleItemChanged}
            />
            <View style={styles.pagination}>
                {carouselData.map((item, index) =>
                {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [12, 30, 12],
                        extrapolate: "clamp"
                    })

                    return(
                        <Animated.View
                            key={item.id.toString()}
                            style={[styles.dot, {width: dotWidth}]}
                        />
                    )
                } 
                )}
            </View>
        </View>
    )
}

export default SimpleCarousel;


const styles = StyleSheet.create({
    carousel: {
        backgroundColor: Colors.pink,
        height: 150,
        borderRadius: 16,
        overflow: "hidden",
        marginTop: 100,
        marginHorizontal: 20
    },
    carouselItem: {
        // width: Dimensions.get("window").width,
        width: Dimensions.get("window").width -40, // 40 is the marginLeft and marginRight
        alignItems: "center",
        justifyContent: "center"
    },
    carouselNumber: {
        fontFamily: "poppins-regular",
        fontSize: 40,
        lineHeight: 60,
        letterSpacing: 1,
        color: Colors.white,
    },
    carouselTitle: {
        fontFamily: "poppins-regular",
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 1,
        color: Colors.white
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 12
    },
    dot: {
        width: 6, 
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.white,
        marginHorizontal: 3,
    }
})