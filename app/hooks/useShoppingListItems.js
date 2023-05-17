import useShoppingLists from "./useShoppingLists";

export default () => {
  const lists = useShoppingLists();

  const add = (item, listId) => {
    const list = lists.getList(listId);

    list.items.push(map(item));

    syncList(list);
  };

  const remove = (item, listId) => {
    const list = lists.getList(listId);

    list.items = list.items.filter(({ id }) => id !== item.id);

    syncList(list);
  };

  const update = (item, listId) => {
    const list = lists.getList(listId);

    list.items = list.items.map((l) => (l.id === item.id ? item : l));

    syncList(list);
  };

  const map = ({ category, name, unitPrice, quantity }) => ({
    category,
    id: JSON.stringify(new Date()),
    name,
    unitPrice,
    quantity,
  });

  function syncList(list) {
    lists.save(list);
    lists.setShoppingList(list);
  }

  function save(items) {
    lists.setShoppingList({ ...lists.shoppingList, items });
  }

  return { add, remove, save, update };
};
