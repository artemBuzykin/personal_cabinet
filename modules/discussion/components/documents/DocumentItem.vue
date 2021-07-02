<template>
    <div class="lk-documents__item-wrap">
        <div class="lk-documents__item" :class="getFormat">
            <div class="lk-documents__item-body">
                <div class="lk-documents__item-img" @click="downloadDocument" />
                <div class="lk-documents__item-name" @click="downloadDocument">
                    {{ baseDocument.name }}
                </div>
                <div class="lk-documents__item-size">
                    {{ getSize }}
                </div>
                <div class="lk-documents__item-label">
                    <span
                        v-if="!isDescriptionEdit"
                        class="text"
                        @click.stop="isDescriptionEdit = true"
                    >
                        {{ baseDocument.description || 'Пометка...' }}
                    </span>
                    <document-label-edit
                        v-else
                        :id="baseDocument.id"
                        v-model="baseDocument.description"
                        @edit-close="isDescriptionEdit = false"
                    />
                </div>
            </div>
            <div class="lk-documents__item-footer">
                <div class="lk-documents__item-author">
                    {{ authorName }}
                </div>
                <div class="lk-documents__item-date">
                    {{ getTime }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import document from '@/mixins/document';
import DocumentLabelEdit from './DocumentLabelEdit.vue';

export default {
    components: { DocumentLabelEdit },
    mixins: [document],
    props: {
        document: {},
    },
    data() {
        return {
            isDescriptionEdit: false,
            baseDocument: { ...this.document },
        };
    },
    computed: {
        authorName() {
            if (this.baseDocument.author_name !== null) {
                const split_name = this.baseDocument.author_name.split(' ');
                if (split_name.length > 1) {
                    return `${split_name[1]} ${split_name[0].substr(0, 1)}.`;
                }
                return this.baseDocument.author_name;
            }
            return 'Пользователь';
        },
    },
};
</script>

<style lang="scss" scoped></style>
