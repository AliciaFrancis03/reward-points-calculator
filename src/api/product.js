import products from "../data/product.json";

export const useProductApi = () => ({
    getAllProducts: async () => new Promise(function(resolve, reject) {
        resolve(products);
    }),
    getProductById: async (id) => new Promise.resolve(products.filter((product) => product.id === id))
});