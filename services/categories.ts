import { ICategory, ProductCategory, CategoryColor, IProduct } from '@/config/types'
import { allProducts } from './products'

// Función helper para obtener productos por categoría
const getProductsByCategory = (category: ProductCategory) => {
	return allProducts.filter(product => product.category === category)
}

// Definición de categorías
export const categories: ICategory[] = [
	{
		id: 'burgers',
		name: ProductCategory.BURGER,
		icon: 'burger',
		title: 'Hamburguesas',
		subtitle: 'Carne premium y vegetales frescos',
		color: CategoryColor.ORANGE,
		products: getProductsByCategory(ProductCategory.BURGER),
	},
	{
		id: 'desserts',
		name: ProductCategory.DESSERT,
		icon: 'cake',
		title: 'Postres',
		subtitle: 'Dulces momentos',
		color: CategoryColor.SWEET,
		products: getProductsByCategory(ProductCategory.DESSERT),
	},
	{
		id: 'breads',
		name: ProductCategory.BREAD,
		icon: 'bakery',
		title: 'Panadería',
		subtitle: 'Horneado fresco cada día',
		color: CategoryColor.AMBER,
		products: getProductsByCategory(ProductCategory.BREAD),
	},
	{
		id: 'drinks',
		name: ProductCategory.DRINK,
		icon: 'local_bar',
		title: 'Bebidas',
		subtitle: 'Refrescantes y variadas',
		color: CategoryColor.EMERALD,
		products: getProductsByCategory(ProductCategory.DRINK),
	},
	{
		id: 'icecream',
		name: ProductCategory.ICECREAM,
		icon: 'icecream',
		title: 'Helados',
		subtitle: 'Lo más frío y delicioso',
		color: CategoryColor.ROSE,
		products: getProductsByCategory(ProductCategory.ICECREAM),
	},
	{
		id: 'combos',
		name: ProductCategory.COMBO,
		icon: 'restaurant',
		title: 'Combos',
		subtitle: 'Ahorra con nuestras ofertas',
		color: CategoryColor.SWEET,
		products: getProductsByCategory(ProductCategory.COMBO),
	},
	{
		id: 'snacks',
		name: ProductCategory.SNACK,
		icon: 'fastfood',
		title: 'Snacks',
		subtitle: 'Antojos rápidos',
		color: CategoryColor.ORANGE,
		products: getProductsByCategory(ProductCategory.SNACK),
	},
]

// Función para obtener una categoría por nombre
export const getCategoryByName = (name: ProductCategory): ICategory | undefined => {
	return categories.find(cat => cat.name === name)
}

// Función para obtener productos por ID de categoría
export const getProductsByCategoryId = (categoryId: string): IProduct[] => {
	const category = categories.find(cat => cat.id === categoryId)
	return category ? category.products : []
}