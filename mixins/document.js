import * as dayjs from 'dayjs';

export default {
    data() {
        return {
            document_format: {
                pdf: ['pdf'],
                txt: ['doc', 'docx', 'rtf', 'pps', 'pptx', 'ppt', 'pages'],
                table: ['xls', 'xlsx', 'numbers'],
                archive: ['zip', 'rar', '7z', 'gz'],
                img: ['jpeg', 'bmp', 'png', 'jpg', 'gif'],
            },
        };
    },
    computed: {
        getTime() {
            if (this.baseDocument.created_at) {
                return dayjs(this.baseDocument.created_at).format('DD.MM.YY');
            }
        },
        getSize() {
            return `${(this.baseDocument.size / 1024).toFixed(2)} KB`;
        },
        getFormat() {
            const format = Object.keys(this.document_format).find((key) => {
                return this.document_format[key].includes(this.baseDocument.extension);
            });
            return format || '';
        },
    },
    methods: {
        downloadDocument() {
            this.$axios
                .get(`/deals/documents/${this.baseDocument.id}/download`, {
                    responseType: 'arraybuffer',
                })
                .then((response) => {
                    const a = document.createElement('a');
                    const file = new Blob([response.data], {
                        type: response.headers['content-type'],
                    });
                    a.href = window.URL.createObjectURL(file);
                    a.download = this.baseDocument.name;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
        },
    },
};
