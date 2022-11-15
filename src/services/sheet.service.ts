import {
  BaseService,
  Status,
  DataResponse,
  MessageResponse,
  MessageData,
} from '@/core/services/base.service';
import { Sheet } from '@/models/sheet.model';
import { ShortCut } from '@/models/shortcut.model';

class SheetService extends BaseService {
  private url: string = '/api/sheets';

  private cached: Sheet[] = [];

  constructor() {
    super();
  }

  public new(): Sheet {
    return {
      id: -1,
      description: '',
      shortcuts: [],
    };
  }

  public async getList(): Promise<DataResponse<Sheet[]>> {
    let res: any = {
      status: Status.Ok,
      data: [],
    };
    if (!this.hasCache()) {
      res = await this.$http.get<Sheet[]>(`${this.url}`);
      this.setCache(res.data);
    }
    return {
      status: res.status === Status.Ok,
      data: this.getCache(),
    };
  }

  public async get(id: number): Promise<DataResponse<Sheet>> {
    const res = await this.$http.get<Sheet>(`${this.url}/${id}`);
    return {
      status: res.status === Status.Ok,
      data: res.data,
    };
  }

  public async put(sheet: Sheet): Promise<DataResponse<Sheet>> {
    const res = await this.$http.put<Sheet>(`${this.url}/${sheet.id}`, sheet);
    this.clearCache();
    return {
      status: res.status === Status.Ok,
      data: res.data,
    };
  }

  public async post(sheet: Sheet): Promise<DataResponse<Sheet>> {
    const res = await this.$http.post<Sheet>(this.url, sheet);
    this.clearCache();
    return {
      status: res.status === Status.Ok,
      data: res.data,
    };
  }

  public async postShortCut(
    sheet: Sheet,
    shortCut: ShortCut,
  ): Promise<DataResponse<Sheet>> {
    const res = await this.$http.post<Sheet>(
      `${this.url}/${sheet.id}/${shortCut.id}`,
      shortCut,
    );
    this.clearCache();
    return {
      status: res.status === Status.Ok,
      data: res.data,
    };
  }

  public async delete(id: number): Promise<MessageResponse> {
    const res = await this.$http.delete<MessageData>(`${this.url}/${id}`);
    this.clearCache();
    return {
      status: res.status === Status.Ok,
      message: res.data.message,
    };
  }

  private getCache(): Sheet[] {
    return this.cached;
  }

  private setCache(list: Sheet[]): void {
    this.cached = list;
  }

  private hasCache(): boolean {
    return this.cached.length !== 0;
  }

  private clearCache(): void {
    this.setCache([]);
  }
}

export default new SheetService();
