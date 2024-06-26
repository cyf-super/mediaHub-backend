import { Context, Request, ParameterizedContext } from 'koa';

export interface FileType {
  originalname: string;
  buffer: Buffer;
  size: number;
  mimetype: string;
}

export interface Files {
  file: FileType[];
}

export type KoaContext<T = unknown> = Context & {
  files: Files;
  request: Request & { body: T };
};
