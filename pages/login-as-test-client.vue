<script>
export default {
    name: 'LoginAsTestClient',
    auth: false,
    async middleware(cxt) {
        const response = await cxt.$axios.post('/clients/auth/login-as-client', {
            key: process.env.TEST_CLIENT_KEY,
            client_id: process.env.TEST_CLIENT_ID,
        });
        await cxt.$auth.setUserToken(response.data.data.token);
        return cxt.redirect('/');
    },
};
</script>
