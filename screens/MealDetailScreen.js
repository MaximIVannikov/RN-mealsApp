import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
	// const favoriteMealCtx = useContext(FavoritesContext);
	const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
	const dispatch = useDispatch();

	const mealId = route.params.mealId;

	// const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);
	const mealIsFavorite = favoriteMealIds.includes(mealId);

	function changeFavoriteStatusHandler() {
		if (mealIsFavorite) {
			// favoriteMealCtx.removeFavorite(mealId);
			dispatch(removeFavorite({ id: mealId }));
		} else {
			// favoriteMealCtx.addFavorite(mealId);
			dispatch(addFavorite({ id: mealId }));
		}
	}

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => {
				return <IconButton icon={mealIsFavorite ? 'star' : 'star-outline'} color='white' onPress={changeFavoriteStatusHandler} />;
			},
		});
	}, [navigation, changeFavoriteStatusHandler]);

	const selectedMeal = MEALS.find(meal => meal.id === mealId);
	return (
		<ScrollView style={styles.rootContainer}>
			<Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
			<Text style={styles.title}>{selectedMeal.title}</Text>
			<MealDetails affordability={selectedMeal.affordability} complexity={selectedMeal.complexity} duration={selectedMeal.duration} textStyle={styles.detailText} />
			<View style={styles.listOuterContainer}>
				<View style={styles.listContainer}>
					<Subtitle>Ingredients</Subtitle>
					<List data={selectedMeal.ingredients} />
					<Subtitle>Steps</Subtitle>
					<List data={selectedMeal.steps} />
				</View>
			</View>
		</ScrollView>
	);
}

export default MealDetailScreen;

const styles = StyleSheet.create({
	rootContainer: {
		marginBottom: 32,
	},
	image: {
		width: '100%',
		height: 350,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		margin: 8,
		textAlign: 'center',
		color: 'white',
	},
	detailText: {
		color: 'white',
	},
	listContainer: {
		maxWidth: '80%',
	},
	listOuterContainer: {
		alignItems: 'center',
	},
});
