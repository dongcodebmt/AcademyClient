import Vue from "vue"

if (!Vue.__my_mixin__) {
    Vue.__my_mixin__ = true
    Vue.mixin({
        methods: {
            async setCookie(name, value, exp) {
                var expires = "";
                if (exp) {
                    var date = new Date(exp);
                    expires = "; expires=" + date.toUTCString();
                }
                document.cookie = name + "=" + (value || "") + expires + "; path=/";
            },
            async getCookie(name) {
                var nameEQ = name + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return await c.substring(nameEQ.length, c.length);
                }
                return await null;
            },
            async axiosGet(url) {
                try {
                    let res = await this.$axios.get(url);
                    return res;
                } catch (e) {
                    console.log(e);
                    return e.response;
                }
            },
            async axiosPost(url, body) {
                try {
                    let res = await this.$axios.post(url, body);
                    return res;
                } catch (e) {
                    console.log(e);
                    return e.response;
                }
            },
            async axiosPut(url, body) {
                try {
                    let res = await this.$axios.put(url, body);
                    return res;
                } catch (e) {
                    console.log(e);
                    return e.response;
                }
            },
            async axiosDelete(url) {
                try {
                    let res = await this.$axios.delete(url);
                    return res;
                } catch (e) {
                    console.log(e);
                    return e.response;
                }
            }
        }
    })
}