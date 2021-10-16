async function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return await c.substring(nameEQ.length, c.length);
    }
    return await null;
};

async function setCookie(name, value, exp) {
    var expires = '';
    if (exp) {
        var date = new Date(exp);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
    return;
};

export default async function ({ route, redirect, $axios }) {
    let list = ['course', 'blog', 'question', 'signout'];
    let accessToken = await getCookie('accessToken');
    let refreshToken = await getCookie('refreshToken');

    if (accessToken === null && refreshToken) {
        try {
            let body = { token: refreshToken };
            let res = await $axios.post('/api/auth/refresh', body);
            if (res.status === 200) {
                await setCookie('accessToken', res.data.token, res.data.expires);
            }
        } catch (e) {
            console.log(e)
            return redirect('/auth/signin');
        }
    }

    let routeName = route.name ? route.name.split('-') : null;
    routeName = routeName ? routeName[0] : null;
    if (accessToken !== null && routeName === 'auth') {
        return redirect('/');
    }

    if (!list.includes(routeName)) {
        return;
    }

    if (accessToken === null && refreshToken === null) {
        return redirect('/auth/signin');
    }

}