import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
  MetaMetricsEventAccountType,
} from '../../../../../shared/constants/metametrics';

function getValues(pendingApproval, t, actions, _history, _data, { trackEvent }) {
  const { origin: snapId, snapName } = pendingApproval;

  const trackSnapAccountEvent = (event) =>
    trackEvent({
      event,
      category: MetaMetricsEventCategory.Accounts,
      properties: { account_type: MetaMetricsEventAccountType.Snap, snap_id: snapId, snap_name: snapName },
    });

  const onCancel = () => {
    trackSnapAccountEvent(MetaMetricsEventName.AddSnapAccountCanceled);
    actions.resolvePendingApproval(pendingApproval.id, false);
  };

  return {
    content: [{ element: 'CreateSnapAccount', key: 'create-snap-account', props: { snapId, snapName, onCancel } }],
    cancelText: t('cancel'),
    submitText: t('create'),
    onLoad: () => trackSnapAccountEvent(MetaMetricsEventName.AddSnapAccountViewed),
    onSubmit() {
      trackSnapAccountEvent(MetaMetricsEventName.AddSnapAccountConfirmed);
      actions.resolvePendingApproval(pendingApproval.id, true);
    },
    onCancel,
  };
}

export default { getValues };
