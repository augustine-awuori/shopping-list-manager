import { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import listsStorage from "../utility/storage";
import ShoppingListsContext from "../context/ShoppingListsContext";

export default () => {
  const context = useContext(ShoppingListsContext);

  const setShoppingList = context?.setShoppingList;
  const shoppingList = context?.shoppingList;
  const setShoppingLists = context?.setShoppingLists;
  const shoppingLists = context?.shoppingLists;

  useEffect(() => {
    init();
  }, [shoppingList?.lastUpdate]);

  const init = async () => {
    await SplashScreen.preventAutoHideAsync();
    setShoppingLists(await listsStorage.getAll());
    await SplashScreen.hideAsync();
  };

  const add = async (list) => {
    const mapped = map(list);

    setShoppingLists([mapped, ...shoppingLists]);

    return await listsStorage.add(mapped);
  };

  const remove = async ({ id }) => {
    setShoppingLists([...shoppingLists].filter((list) => id !== list.id));

    await listsStorage.removeList(id);
  };

  const get = async (listId) => {
    const lists = await listsStorage.getAll();

    return lists.find((list) => list.id === listId);
  };

  const save = async (list) => {
    setShoppingList(list);
    setShoppingLists(
      [...shoppingLists].map((l) => (l.title === list.title ? list : l))
    );

    return await listsStorage.update(list);
  };

  const map = ({ budgetLimit, shoppingCentre, title }) => ({
    budget: budgetLimit,
    id: JSON.stringify(new Date()),
    items: [],
    lastUpdate: undefined,
    shoppingCentre,
    title,
  });

  const setShoppingListById = async (listId) =>
    setShoppingList(await get(listId));

  return {
    add,
    data: shoppingLists,
    get,
    init,
    remove,
    save,
    setShoppingList,
    setShoppingListById,
    shoppingList,
    shoppingListItemsCount: shoppingList?.items?.length || 0,
  };
};
