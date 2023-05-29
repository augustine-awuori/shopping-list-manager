import time from "../utility/time";
import useAlert from "./useAlert";
import useShoppingLists from "./useShoppingLists";

export default () => {
  const { alert } = useAlert();
  const lists = useShoppingLists();

  const add = async (item, listId) => {
    const list = await lists.get(listId);

    list.items.push(map(item));

    syncList(list);
  };

  const remove = (item, listId) => askBeforeRemoval(item, listId);

  const askBeforeRemoval = (item, listId) =>
    alert(
      "Shopping List Item Deletion!",
      `Are you sure you want to remove this ${item.name} permanently?`,
      "I'm sure",
      async () => await erase(item, listId),
      "Cancel"
    );

  const erase = async (item, listId) => {
    eraseFromState(item);
    await eraseFromCache(item, listId);
  };

  const eraseFromState = async (item) => {
    const items = [...lists.shoppingList.items];

    await save(items.filter(({ name }) => name !== item.name));
  };

  const eraseFromCache = async (item, listId) => {
    const list = await lists.get(listId);

    list.items = list.items.filter(({ id }) => id !== item.id);

    syncList(list);
  };

  const update = async (item, listId) => {
    const list = await lists.get(listId);

    list.items = list.items.map((i) => (i.id === item.id ? item : i));

    syncList(list);
  };

  const map = ({ category, name, unitPrice, quantity }) => ({
    category,
    id: time.now(),
    name,
    unitPrice,
    quantity,
  });

  function syncList(list) {
    list.lastUpdate = time.now();

    lists.save(list);
  }

  async function save(items) {
    syncList({ ...lists.shoppingList, items });
  }

  return { add, remove, save, update };
};
