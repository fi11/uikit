import DI from '@uikit/di';

export default () => {
  const PropTypes = DI.get('@uikit/PropTypes');

  return PropTypes.shape({
    getValues: PropTypes.func.isRequired,
    getChanges: PropTypes.func.isRequired,
    getErrors: PropTypes.func.isRequired,
    getErrorText: PropTypes.func.isRequired,
    isDisabled: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    isDirty: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    registerCallback: PropTypes.func.isRequired,
  });
};

