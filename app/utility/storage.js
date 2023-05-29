import AsyncStorage from "@react-native-async-storage/async-storage";

const key = "cache shoppingLists";

async function add(list) {
  try {
    let lists = await getAll();
    lists.unshift(list);

    await AsyncStorage.setItem(key, JSON.stringify(lists));

    return { ok: true };
  } catch (error) {
    return { data: "Error storing a shopping list: " + error };
  }
}

async function storeLists(lists) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(lists));
    return { ok: true };
  } catch (error) {
    return { data: "Error storing shopping lists: " + error };
  }
}

async function getAll() {
  try {
    const value = await AsyncStorage.getItem(key);

    return JSON.parse(value) || [];
  } catch (error) {
    console.log("Error retrieving lists", error);
  }
}

async function update(updatedList) {
  const lists = await getAll();

  const updated = lists.map((list) =>
    list.id === updatedList.id ? updatedList : list
  );

  return await storeLists(updated);
}

async function removeList(listId) {
  const lists = await getAll();

  storeLists(lists.filter((list) => list.id !== listId));
}

export default {
  getAll,
  removeList,
  add,
  update,
};
