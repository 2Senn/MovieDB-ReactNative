/**
 * Inspiration: https://dribbble.com/shots/8257559-Movie-2-0
 *
 */
import * as React from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { getMovies } from '../api/movies';
import Genres from '../components/genres';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../components/loading'
import Backdrop from '../components/backdrop'

const { width, height } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const GRID_WIDTH = width * 0.5
const GRID_HEIGHT = GRID_WIDTH / (16/9)



export const HomeScreen = () => {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <ScrollView style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <View style={{ flex: 3}}>

      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        contentContainerStyle={{
          margin: SPACING,
        }}
        renderToHardwareTextureAndroid
        snapToInterval={ITEM_SIZE}
        snapToAlignment='start'
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_SIZE, flex: 1, marginBottom: 100 }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{ translateY }],
                  backgroundColor: '#ffffff',
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={styles.posterImage}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Genres genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={2} >
                  {item.description}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
      </View>
      <View style={{ flex: 1, margin: SPACING }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000'}}>Movie List</Text>
      <FlatList 
        data={movies}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        bounces={false}
        numColumns={2}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{ width: width, height: 0, position: 'absolute' }} />;
          }
          return(
            <View style={styles.secondListContainer}>
              <Image 
                source={{ uri: item.poster}} 
                style={{ width: "100%", height: GRID_HEIGHT, borderTopLeftRadius: 30}}
              />
              <View style={{ flex: 1, padding: SPACING, alignItems: 'center', justifyContent: 'center'}}>
                <Text 
                  style={{ 
                    alignSelf: 'center', 
                    fontSize: 16, 
                    fontWeight: 'bold', 
                    color: '#fbfbfb'
                    
                  }}
                  numberOfLines={3}
                >
                    {item.title}
                </Text>
              </View>
            </View> 
          )
        }}
      />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE / 1.2 ,
    resizeMode: 'stretch',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  secondListContainer: {
    flex: 1, 
    width: GRID_WIDTH, 
    height: GRID_WIDTH, 
    margin: SPACING,
    backgroundColor: '#121212', 
    borderRadius: 30,
    elevation: 20
  }
});

export default HomeScreen
