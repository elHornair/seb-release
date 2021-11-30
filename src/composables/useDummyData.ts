import { computed, readonly, ref } from "vue";

const allColumnsVisible = ref(true);

const dummyFieldsFull = [
  {
    name: "theme",
    label: "Theme",
    isMain: false,
    isSecondary: true,
    getDummyDataById: (id: number) => {
      const dummyValues = [
        "dark",
        "bright",
        "red",
        "green",
        "blue",
        "",
        "",
        "",
        "",
      ];
      return dummyValues[(1 + 13 * id) % dummyValues.length];
    },
  },
  {
    name: "alias",
    label: "Alias",
    isMain: false,
    isSecondary: true,
    getDummyDataById: (id: number) => {
      const dummyValues = ["eth", "eth", "ethz", "uzh", "", "", ""];
      return dummyValues[(3 + 5 * id) % dummyValues.length];
    },
  },
  {
    name: "date",
    label: "Founding date",
    isMain: false,
    isSecondary: true,
    getDummyDataById: (id: number) => {
      const years = ["1854", "2001", "1901", "1854", "1854"];
      const year = years[id % years.length];
      const month = Math.abs(((15 - 3 * id) % 12) + 1);
      const day = Math.abs(((3 + 7 * id) % 28) + 1);
      return `${day < 10 ? "0" + day : day}.${
        month < 10 ? "0" + month : month
      }.${year}`;
    },
  },
];

const dummyFieldsBasic = computed(() =>
  dummyFieldsFull.map((dummyField) => {
    const { name, label, isMain, isSecondary } = dummyField;
    return { name, label, isMain, isSecondary };
  })
);

const decorateItemsWithDummyData = (
  items: { id: number; [key: string]: string | number }[]
) => {
  items.map((item) => {
    dummyFieldsFull.forEach((dummyField) => {
      item[dummyField.name] = dummyField.getDummyDataById(item.id);
    });

    return item;
  });

  return items;
};

/*
 - This only exists to demonstrate how the institutions table behaves if there are many columns
 - This composable and all references to it should be removed for production use
 - The getDummyDataById functions return deterministic values (so the same item always has the same value) based on the
   id. However they are made to look random, so it's a bit less obvious that they are not real.
 */
export const useDummyData = () => {
  return {
    decorateItemsWithDummyData,
    dummyFields: dummyFieldsBasic,
  };
};
