import { useContext, useEffect } from "react";

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
  }, [shoppingList?.items?.length]);

  const init = async () => setShoppingLists(await listsStorage.getAll());

  const add = async (list) => {
    const mapped = map(list);

    setShoppingLists([mapped, ...shoppingLists]);

    return await listsStorage.add(mapped);
  };

  const remove = ({ id }) => {
    setShoppingLists([...shoppingLists].filter((list) => id !== list.id));

    listsStorage.removeList(id);
  };

  const update = async (list) => {
    const mapped = map(list);

    setShoppingLists(
      [...shoppingLists].map((l) => (l.title === list.title ? mapped : l))
    );
    setShoppingList(mapped);

    return await listsStorage.update(mapped);
  };

  const getList = (listId) =>
    [...shoppingLists].find((list) => list.id === listId);

  const save = (list) => {
    setShoppingLists(
      [...shoppingLists].map((l) => (l.id === list.id ? list : l))
    );
    listsStorage.update(list);
  };

  const map = ({ budgetLimit, shoppingCentre, title }) => ({
    id: new Date(),
    budget: budgetLimit,
    shoppingCentre,
    title,
    items: [],
  });

  const setShoppingListById = (listId) => setShoppingList(getList(listId));

  return {
    add,
    data: shoppingLists,
    getList,
    init,
    remove,
    save,
    setShoppingList,
    setShoppingListById,
    shoppingList,
    shoppingListItemsCount: shoppingList?.items?.length || 0,
    update,
  };
};
