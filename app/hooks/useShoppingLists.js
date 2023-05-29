import { useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

import listsStorage from "../utility/storage";
import ShoppingListsContext from "../context/ShoppingListsContext";
import time from "../utility/time";
import useAlert from "./useAlert";

export default () => {
  const context = useContext(ShoppingListsContext);
  const { alert } = useAlert();

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

  const askBeforeRemoval = ({ id, title }) =>
    alert(
      "Shopping List Deletion",
      `Are you sure you want to remove this ${title} permanently?`,
      "I'm sure",
      () => erase(id),
      "Cancel"
    );

  const erase = (id) => {
    setShoppingLists([...shoppingLists].filter((list) => id !== list.id));

    listsStorage.removeList(id);
  };

  const remove = (item) => askBeforeRemoval(item);

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
    id: time.now(),
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
