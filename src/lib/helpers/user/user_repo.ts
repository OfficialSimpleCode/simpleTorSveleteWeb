import FirestoreDataBase from "$lib/services/external_services/firestore";
import type { UserApi } from "./user_api";

export default class UserRepo extends FirestoreDataBase implements UserApi {
  constructor() {
    super();
  }
}
