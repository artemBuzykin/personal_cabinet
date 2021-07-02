<template>
    <div class="lk-documents">
        <empty-placeholder v-if="!order.documents.length" src="documents-empty.png">
            <h3>Отсутствие запроса!</h3>
        </empty-placeholder>
        <div v-else class="lk-documents__block">
            <div v-for="(document, i) in order.documents" :key="i" class="lk-documents__item-wrap">
                <div class="lk-documents__item" :class="document.format">
                    <div class="lk-documents__item-body">
                        <div class="lk-documents__item-img" />
                        <div class="lk-documents__item-name">
                            {{ document.name }}.{{ document.extension }}
                        </div>
                        <div class="lk-documents__item-size">
                            {{ document.size }}
                        </div>
                        <div class="lk-documents__item-label">
                            <span>{{ document.label }}</span>
                        </div>
                    </div>
                    <div class="lk-documents__item-footer">
                        <div class="lk-documents__item-author">
                            {{ document.author.first_name }}
                            {{ document.author.last_name.substr(0, 1) + '.' }}
                        </div>
                        <div class="lk-documents__item-date">
                            {{ document.date }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['order'],
    data: () => ({}),
};
</script>

<style lang="scss" scoped></style>
