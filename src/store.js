export const initialStore = () => {
  return {
    favorites: []
  };
};

export default function storeReducer(store, action = {}) {

  switch (action.type) {

    case "add_favorite":
      return {
        ...store,
        favorites: [...store.favorites, action.payload]
      };

    case "remove_favorite":
      return {
        ...store,
        favorites: store.favorites.filter(
          item => item !== action.payload
        )
      };

    default:
      return store;
  }
}
