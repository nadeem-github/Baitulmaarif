// export class ShortClipModal {
//     UrTitle: any;
//     UrMolanaName: any;
//     UrImagePath: any;
//     UrMp4path: any;
//     UrDescriptions: any;
//     Title: any;
//     MolanaName: any;
//     ImagePath: any;
//     Mp4path: any;
//     Descriptions: any;
//     UrFileSize: any;
//     FileSize: any;
//     UploadDate: any;
//     UrUploadDate: any;
//     CountViews: any;
//     UrCountViews: any
// }

export class ShortClipModal {
    PageIndexSize: number;
    SortOrder: string;
    Filter: string;
    PageSize: number;
    SortBy: string;
  
    constructor() {
      this.PageIndexSize = 1;
      this.SortOrder = 'desc';
      this.Filter = '';
      this.PageSize = 10;
      this.SortBy = 'Title';
    }
  }
  