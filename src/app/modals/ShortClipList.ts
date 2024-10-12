export class ShortClipModal {
  PageIndexSize: number;
  SortOrder: string;
  Filter: string;
  PageSize: number;
  SortBy: string;
  MolanaBayanId: any;

  constructor() {
    this.PageIndexSize = 0;
    this.SortOrder = 'desc';
    this.Filter = '';
    this.PageSize = 10;
    this.SortBy = '';
  }
}
