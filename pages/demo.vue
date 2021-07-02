<script>
export default {
    async middleware(cxt) {
        try {
            const response = await cxt.$axios.post('/clients/enter-demo-mode');
            await cxt.$auth.setUserToken(response.data.data.token);
        } catch (err) {}
        return cxt.redirect('/');
    },
};
</script>
