import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  hideDeleteMetaMetricsDataModal,
  openDataDeletionErrorModal,
} from '../../../ducks/app/app';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  Box,
  Button,
  ButtonSize,
  ButtonVariant,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../../component-library';
import {
    AlignItems, BlockSize, Display, FlexDirection
} from '../../../helpers/constants/design-system';
import { createMetaMetricsDataDeletionTask } from '../../../store/actions';

const MetaMetricsContext = React.createContext(null);

export default function ClearMetaMetricsData() {
    const t = useI18nContext();
    const dispatch = useDispatch();
    const trackEvent = useContext(MetaMetricsContext);

    const closeModal = () => dispatch(hideDeleteMetaMetricsDataModal());
    const deleteMetaMetricsData = async () => {
        try {
            await createMetaMetricsDataDeletionTask();
            trackEvent({
                category: "Settings",
                event: "metrics_data_deletion_request"
            }, {});
        }
        catch (error) {
            dispatch(openDataDeletionErrorModal());
            trackEvent({
                category: "Settings",
                event: "error_occured"
            }, {});
        }
        finally {
            closeModal();
        }
    };

return (
<>
<Box display={Display.Flex}>
<Box flexDirection={FlexDirection.Column}>
<Text variant="headingSm">
{t("delete_meta_metrics_data_modal_title")}
</Text>
<Text variant="body_sm_medium">
{t("delete_meta_metrics_data_modal_description")}
</Text>
</Box>
</Box>

<Button onClick={closeModal}>Cancel</Button>
<Button onClick={deleteMetaMetricsData}>Clear Data</Button>

{/* This is a temporary placeholder for the context */}
{MetaMetricsContext.Provider value={{
trackEvent
}}>
<div>Placeholder content for the context.</div>
{MetaMetricsProvider}
);
}
