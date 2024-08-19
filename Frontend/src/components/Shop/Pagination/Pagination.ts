export default class Pagination<T> {
  private itemsPerPage: number;
  private items: T[];
  setPage: (newPage: number) => void;
  maxPage: number;
  private currentPage: number = 1;

  constructor(
    itemsPerPage: number,
    items: T[],
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) {
    this.itemsPerPage = itemsPerPage;
    this.items = items;
    this.setPage = setPage;
    this.maxPage = Math.ceil(this.items.length / this.itemsPerPage);
  }

  alterPage(newPage: number) {
    if (newPage < 1 || newPage > this.maxPage) return;
    this.currentPage = newPage;
    this.setPage(newPage);
  }

  setNextPage(): void {
    this.alterPage(Math.min(this.maxPage, this.currentPage + 1));
  }

  setPreviousPage(): void {
    this.alterPage(Math.max(1, this.currentPage - 1));
  }

  setFirstPage(): void {
    this.alterPage(1);
  }
  setLastPage(): void {
    this.alterPage(this.maxPage);
  }

  returnItemsToDisplay(): T[] {
    const startingIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endingIndex = startingIndex + this.itemsPerPage;
    return this.items.slice(startingIndex, endingIndex);
  }

  returnCurrentPage(): number {
    return this.currentPage;
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.maxPage;
  }
}
