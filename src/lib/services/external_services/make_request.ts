import { logger } from "$lib/consts/application_general";
import { serverSignature } from "$lib/consts/secrets";
import { SERVER_BASE_URL } from "$lib/consts/server_variables";
export default class MakeRequest {
  private readonly _baseURL: string = `http://${SERVER_BASE_URL}`;

  public async performRequst({
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
    const url = new URL(endpoint, this._baseURL);

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
      console.log(`request resp body -->\n${response.status}`);

      logger.info(`request resp body -->\n${response}`);

      if (response.status === 200) {
        // request succeeded
        logger.info("request status -- > Success!");
        return await response.json();
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
  }): Promise<Response> {
    switch (method) {
      case "post":
        console.log("post", url);
        return await fetch(url, {
          method: "POST",
          body: body,
          headers: headers,
        });
      case "get":
        console.log("get", url);
        return await fetch(url, { method: "GET", headers: headers });
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }
}
