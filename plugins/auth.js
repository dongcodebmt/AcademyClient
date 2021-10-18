export default async function ({ app }) {
    if (!app.$auth.loggedIn) {
        return
    }

    let auth = app.$auth;

    let authStrategy = auth.strategy.name;
    if (authStrategy === 'facebook' || authStrategy === 'google') {
        let token = auth.strategy.token.get().substr(7);
        let url = `/api/auth/${authStrategy}?token=${token}`;
        console.log(url)
        try {
            let data = await app.$axios.$post(url, null);
            await auth.setStrategy('local');
            await auth.setUserToken(data.accessToken, data.refreshToken);
            // await auth.fetchUser();
        } catch (e) {
            console.log(e);
        }
    }
}