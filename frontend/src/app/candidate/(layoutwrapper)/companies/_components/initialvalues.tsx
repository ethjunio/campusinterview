function defaultComparator(current: any) {
    let count = 0;
    for (const k in current) {
      if (!!current[k]) {
        count++;
      }
    }
  
    return count;
  }
  
  const comparators = {
    industryIds: defaultComparator,
    majorIds: defaultComparator,
    offeredPosIds: defaultComparator,
  };
  
  export const defaultValues = {
    industryIds: [],
    majorIds: [],
    offeredPosIds: [],
    favoriteOnly: false,
  };
  
  export function getActiveFiltersListView(id: keyof typeof defaultValues, values: typeof defaultValues): number {
    const initial = defaultValues[id];
    const current = values[id];
  
    if (id === "favoriteOnly") {
      return current ? 1 : 0;
    }
    return comparators[id](current);
  }
  