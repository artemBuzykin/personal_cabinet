<template>
    <div class="lk-order-chat">
        <div class="row">
            <div class="col-lg-8">
                <chat-block />
            </div>
        </div>
    </div>
</template>

<script>
import ChatBlock from './ChatBlock.vue';

export default {
    components: { ChatBlock },
};
</script>

<style lang="scss" scoped></style>
