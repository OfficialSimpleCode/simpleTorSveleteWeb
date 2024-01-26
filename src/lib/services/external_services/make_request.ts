import { logger } from "$lib/consts/application_general";
import { serverSignature } from "$lib/consts/secrets";
import { SERVER_BASE_URL } from "$lib/consts/server_variables";
import fetch from "node-fetch";
export default class MakeRequest {
  private static _singleton: MakeRequest = new MakeRequest();

  private constructor() {}

  public static GI(): MakeRequest {
    return MakeRequest._singleton;
  }

  private readonly _baseURL: string = SERVER_BASE_URL;

  public async performRequest({
    endpoint,
    method,
    data,
    queryParameters,
    onFail = "",
  }: {
    endpoint: string;
    method: string;
    data: Record<string, any>;
    queryParameters?: Record<string, any>;
    onFail?: any;
  }): Promise<any> {
    const url = new URL(`${this._baseURL}/${endpoint}`);
    if (queryParameters) {
      Object.keys(queryParameters).forEach((key) => {
        url.searchParams.append(key, queryParameters[key]);
      });
    }
    url.searchParams.append("signature", serverSignature);

    // convert the body to str
    const body = JSON.stringify(data);

    const headers: Record<string, string> = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      //'Accept': '*/*'
    };

    try {
      const response = await this._request({
        method: method,
        url: url,
        headers: headers,
        body: body,
      });
      logger.info(`request resp body -->\n${response.data}`);

      if (response.status === 200) {
        // request succeeded
        logger.info("request status -- > Success!");
        return response.data;
      }
    } catch (error) {
      logger.info(`request Failed --> ${error}`);
    }
    return onFail;
  }

  private async _request({
    method,
    url,
    headers,
    body,
  }: {
    method: string;
    url: URL;
    headers: Record<string, string>;
    body: string;
  }): Promise<Record<string, any>> {
    switch (method) {
      case "post":
        return await fetch(url, {
          method: "POST",
          body: body,
          headers: headers,
        });
      case "get":
        return await fetch(url, { method: "GET", headers: headers });
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
}
