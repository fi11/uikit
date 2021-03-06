import PropTypes from 'prop-types';

export default () => {
  return PropTypes.shape({
    getValues: PropTypes.func.isRequired,
    getChanges: PropTypes.func.isRequired,
    getErrors: PropTypes.func.isRequired,
    getErrorText: PropTypes.func.isRequired,
    disableForm: PropTypes.func.isRequired,
    enableForm: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
    isSubmitting: PropTypes.func.isRequired,
    isDisabled: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    isDirty: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    registerCallback: PropTypes.func.isRequired,
    setInitValues: PropTypes.func.isRequired,
  });
};
