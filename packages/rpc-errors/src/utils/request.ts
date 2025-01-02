export interface RpcSuccessResponse<T = any> {
  jsonrpc: "2.0";
  id: number | string | null;
  result: T;
  error?: never;
}

export interface RpcErrorResponse {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: never;
  error: {
    code: number;
    message: string;
    data?: any;
  };
}
export type JSONRPCRequest = {
  id: number;
  jsonrpc: "2.0";
  method: string;
  params: unknown;
};

export type RpcResponse<T = any> = RpcSuccessResponse<T> | RpcErrorResponse;

export const createRequest = (endpoint: string) => {
  let id = 1;
  return <T>(method: string, params?: unknown) => {
    const request: JSONRPCRequest = {
      id: id++,
      jsonrpc: "2.0",
      method: method,
      params: params || [],
    };
    return fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((res) => res.json() as Promise<RpcResponse<T>>);
  };
};
