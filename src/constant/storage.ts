import { Storage } from "@supuwoerc/utils"
import { StorageState } from "@/types/storage"

export const globalStorage = new Storage<StorageState>()
