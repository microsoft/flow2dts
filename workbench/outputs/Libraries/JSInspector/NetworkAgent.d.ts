declare const InspectorAgent;
declare type RequestId = string;
declare class Interceptor {
  constructor: (agent: NetworkAgent) => void;
  getData: (requestId: string) => null | undefined | string;
  requestSent: (id: number, url: string, method: string, headers: Object) => void;
  responseReceived: (id: number, url: string, status: number, headers: Object) => void;
  dataReceived: (id: number, data: string) => void;
  loadingFinished: (id: number, encodedDataLength: number) => void;
  loadingFailed: (id: number, error: string) => void;
}
declare type EnableArgs = {
  maxResourceBufferSize?: number;
  maxTotalBufferSize?: number;
};
declare class NetworkAgent extends InspectorAgent {
  DOMAIN: string;
  enable: ($f2t1: EnableArgs) => void;
  disable: () => void;
  getResponseBody: ($f2t1: {
    requestId: RequestId;
  }) => {
    body: null | undefined | string;
    base64Encoded: boolean;
  };
  interceptor: () => Interceptor;
}
declare const $f2tExportDefault: typeof NetworkAgent;
export default $f2tExportDefault;