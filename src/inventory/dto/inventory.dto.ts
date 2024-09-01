import { Inventory } from "@prisma/client";

export interface InventoryFilterType {
    items_per_page?:number;
    page?:number;
    search?:string
  }
  
  export interface InventoryPaginationResponseType{
    data:Inventory[]
    total:number
    currentPage:number
    itemsPerPage:number
  }
  
  