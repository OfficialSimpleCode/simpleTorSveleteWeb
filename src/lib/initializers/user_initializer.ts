class UserInitializer {
    private static instance: UserInitializer;

    
    private constructor() { }

   
    public static GI(): UserInitializer {
        if (!UserInitializer.instance) {
            UserInitializer.instance = new UserInitializer();
        }

        return UserInitializer.instance;
    }

}