<template>
    <div class="user-contacts-modal">
        <component :is="isFormComponent" />
    </div>
</template>

<script>
import UserContactsEmailEdit from './UserContactsEmailEdit.vue';
import UserContactsPhoneEdit from './UserContactsPhoneEdit.vue';

export default {
    components: { UserContactsPhoneEdit, UserContactsEmailEdit },
    computed: {
        isFormComponent() {
            const type = this.$store.getters.getModalProps;
            return type === 'phone' ? 'UserContactsPhoneEdit' : 'UserContactsEmailEdit';
        },
    },
    beforeDestroy() {
        this.$store.commit('setModalProps', null);
    },
};
</script>

<style lang="scss" scoped></style>
