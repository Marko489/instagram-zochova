declare module "formidable" {
    import { IncomingMessage } from "http";
  
    export interface Fields<T = string> {
      [key: string]: T | string[];
    }
  
    export interface File {
      // You can add more properties here based on your use of 'formidable'
      filename: string;
      filepath: string;
      mimetype: string;
      size: number;
      [key: string]: any;
    }
  
    export interface IncomingForm {
      parse(
        req: IncomingMessage,
        callback: (
          err: any,
          fields: Fields,
          files: { [key: string]: File | File[] }
        ) => void
      ): void;
    }
  
    const formidable: {
      IncomingForm: new () => IncomingForm;
    };
  
    export = formidable;
  }
  