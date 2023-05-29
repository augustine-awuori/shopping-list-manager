import useShoppingLists from "./useShoppingLists";

export default () => {
  const lists = useShoppingLists();

  const add = async (item, listId) => {
    const list = await lists.get(listId);

    list.items.push(map(item));

    await syncList(list);
  };

  const remove = async (item, listId) => {
    const list = await lists.get(listId);

    list.items = list.items.filter(({ id }) => id !== item.id);

    await syncList(list);
  };

  const update = async (item, listId) => {
    const list = await lists.get(listId);

    list.items = list.items.map((i) => (i.id === item.id ? item : i));

    await syncList(list);
  };

  const map = ({ category, name, unitPrice, quantity }) => ({
    category,
    id: JSON.stringify(new Date()),
    name,
    unitPrice,
    quantity,
  });

  async function syncList(list) {
    list.lastUpdate = new Date();

    await lists.save(list);
  }

  async function save(items) {
    await syncList({ ...lists.shoppingList, items });
  }

  return { add, remove, save, update };
};
