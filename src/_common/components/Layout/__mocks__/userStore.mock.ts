class UserStore {
    user = {
        id: 1,
        first_name: 'fabulous',
        last_name: 'tester',
        email: 'test@gmail.com',
        username: 'test-user'
    }

    public async getUsers() {
        return new Promise((resolve) => {
            console.log("Called mocked get users");
            process.nextTick(() => resolve(this.user)); //Resolving the promise with the mocked list
        });
    }
}

export default new UserStore();