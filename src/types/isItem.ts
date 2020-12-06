export const isAsset = (item: ListedItem): item is ListedAsset =>
  "lp" in item && "pool" in item

export const isDenom = (item: ListedItem): item is ListedDenom => !isAsset(item)
