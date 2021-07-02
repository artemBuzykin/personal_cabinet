/* eslint-disable no-shadow */
export const state = () => ({
    modalProps: null,
});

export const getters = {
    getModalProps: (state) => state.modalProps,
};

export const mutations = {
    setModalProps(state, props) {
        state.modalProps = props;
    },
};

export const actions = {};
